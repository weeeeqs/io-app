import { IOToast } from "@pagopa/io-app-design-system";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { Millisecond } from "@pagopa/ts-commons/lib/units";
import { useFocusEffect } from "@react-navigation/native";
import * as O from "fp-ts/lib/Option";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  Vibration
} from "react-native";
import { connect } from "react-redux";
import { maximumItemsFromAPI, pageSize } from "../../../../../config";
import { useTabItemPressWhenScreenActive } from "../../../../../hooks/useTabItemPressWhenScreenActive";
import I18n from "../../../../../i18n";
import { Dispatch } from "../../../../../store/actions/types";
import { GlobalState } from "../../../../../store/reducers/types";
import customVariables, {
  VIBRATION_LONG_PRESS_DURATION
} from "../../../../../theme/variables";
import { useOnFirstRender } from "../../../../../utils/hooks/useOnFirstRender";
import {
  Filter,
  loadNextPageMessages,
  loadPreviousPageMessages,
  reloadAllMessages
} from "../../../store/actions";
import {
  allArchiveSelector,
  allInboxSelector,
  isLoadingArchiveNextPage,
  isLoadingArchivePreviousPage,
  isLoadingInboxNextPage,
  isLoadingInboxPreviousPage,
  isReloadingArchive,
  isReloadingInbox
} from "../../../store/reducers/allPaginated";
import { UIMessage } from "../../../types";
import MessageListItem from "./Item";
import {
  EmptyComponent,
  ItemSeparator,
  generateItemLayout,
  renderEmptyList
} from "./helpers";

const styles = StyleSheet.create({
  padded: {
    paddingHorizontal: customVariables.contentPadding
  },
  activityIndicator: {
    padding: 12
  }
});

type OwnProps = {
  ListEmptyComponent?: EmptyComponent;
  ListHeaderComponent?: React.ReactElement;

  /** @deprecated This list is used instead of the messages from the store */
  filteredMessages?: ReadonlyArray<UIMessage>;

  onLongPressItem?: (id: string) => void;
  onPressItem?: (message: UIMessage) => void;

  /** An optional list of messages to mark as selected */
  selectedMessageIds?: ReadonlySet<string>;

  filter: Filter;
};

const Loader = () => (
  <ActivityIndicator
    animating={true}
    size={"large"}
    style={styles.activityIndicator}
    color={customVariables.brandPrimary}
    accessible={true}
    accessibilityHint={I18n.t("global.accessibility.activityIndicator.hint")}
    accessibilityLabel={I18n.t("global.accessibility.activityIndicator.label")}
    importantForAccessibility={"no-hide-descendants"}
    testID={"activityIndicator"}
  />
);

const animated = {
  onScroll: Animated.event([
    {
      nativeEvent: {
        contentOffset: { y: new Animated.Value(0) }
      }
    }
  ]),
  scrollEventThrottle: 8
};

// Do not refresh again automatically before minimumRefreshInterval has passed
const minimumRefreshInterval = 60000 as Millisecond; // 1 minute

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

/**
 * A smart-component connected to the store and dispatching actions.
 * Takes care of mapping pagination to the pull/scroll semantics and track the loading and error states.
 *
 * By default renders all the available Messages in the store, but this behavior can be overruled
 * via the optional parameter `filteredMessages`.
 * Please note that once we filter on the BE the `filteredMessages` parameter will be removed.
 *
 * @param ListEmptyComponent
 * @param animated
 * @param filteredMessages This list is used instead of the messages from the store
 * @param onLongPressItem
 * @param onPressItem
 * @param selectedMessageIds An optional list of messages to mark as selected
 * @constructor
 */
const MessageList = ({
  ListEmptyComponent,
  ListHeaderComponent,
  filteredMessages,
  onLongPressItem,

  onPressItem = (_: UIMessage) => undefined,
  selectedMessageIds,

  // extracted from the store
  allMessages = [],
  error,
  isLoadingMore,
  isLoadingPrevious,
  isReloadingAll,
  didLoad,
  loadNextPage,
  loadPreviousPage,
  nextCursor,
  previousCursor,
  reloadAll,
  testID
}: Props) => {
  // when filteredMessage is defined, this component is used
  // in search, so loading data on demand should be prevented
  const shouldUseLoad = filteredMessages === undefined;
  const messages = filteredMessages ?? allMessages;

  const flatListRef: React.RefObject<FlatList> = useRef(null);

  const [longPressedItemIndex, setLongPressedItemIndex] = useState<
    O.Option<number>
  >(O.none);

  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshFromUser, setIsRefreshFromUser] = useState(false);

  const isLoadingPreviousOrAll = isLoadingPrevious || isReloadingAll;
  useEffect(() => {
    if (!isLoadingPreviousOrAll) {
      setIsRefreshFromUser(false);
    }
  }, [isLoadingPreviousOrAll]);

  useTabItemPressWhenScreenActive(() => scrollTo(0, true), true);

  const hasMessages = messages.length > 0;
  const scrollTo = (index: number, animated: boolean = false) => {
    if (flatListRef.current && hasMessages) {
      flatListRef.current.scrollToIndex({ animated, index });
    }
  };

  const handleOnLayoutChange = () => {
    if (O.isSome(longPressedItemIndex)) {
      scrollTo(longPressedItemIndex.value, true);
      setLongPressedItemIndex(O.none);
    }
  };

  const onLongPress = useCallback(
    ({ id }: UIMessage) => {
      if (!onLongPressItem) {
        return;
      }
      Vibration.vibrate(VIBRATION_LONG_PRESS_DURATION);
      onLongPressItem(id);
      const lastIndex = messages.length - 1;
      const lastMessageId = messages[lastIndex].id;
      if (id === lastMessageId) {
        setLongPressedItemIndex(O.some(lastIndex));
      }
    },
    [messages, onLongPressItem]
  );

  const onEndReached = () => {
    if (shouldUseLoad && nextCursor && !isLoadingMore) {
      loadNextPage(nextCursor);
    }
  };

  // This component has two different spinners: one on top and one
  // on bottom. The former is the standard refresh control while the
  // latter is set as a footer to the list, but only when it has to
  // be shown.
  // There are three data events that require one of them to be shown:
  // the loading of the next message page (older messages), the
  // loading of the previos message page (newer messager) or a global
  // reloading of all messages.
  // While next messages are only loaded when the end of the list has
  // been reached by scrolling (and there are more messages to load),
  // the other two loadings are triggered by using the refresh
  // gesture or when the refresh interval is hit or when a push
  // notification is received and selected with the app in foreground
  // while showing this list or, lastly, at the first showing of this
  // component.
  // In order not to show both spinners, the footer one is shown only
  // if loading the next message page (older messages) or if there
  // are no messages in the list and the loading was triggered
  // automatically (i.e., not from an user swipe-down-to-refresh).
  // The top spinner, on the other hand, is shown only if the user
  // request a loading by swiping-down-to-refresh or, when the
  // loading was system initiated, if there were already messages in
  // the list. Note that the top spinnmer is never shown when
  // loading next page messages (since they are loaded when the list
  // end has been reached. In that case, the footer spinner is shown)
  const shouldShowFooterLoader =
    isLoadingMore ||
    (!hasMessages && !isRefreshFromUser && isLoadingPreviousOrAll);
  const shouldShowTopRefreshControl =
    isRefreshFromUser || (hasMessages && isLoadingPreviousOrAll);
  const isLoadingOrRefreshingMessageList =
    isLoadingMore || isLoadingPreviousOrAll;

  useOnFirstRender(
    () => {
      reloadAll();
    },
    () => shouldUseLoad && !didLoad
  );

  // check if there are new messages when the component becomes focused
  useFocusEffect(
    useCallback(() => {
      const now = new Date();
      const shouldRefreshDelay =
        now.getTime() - lastUpdate.getTime() > minimumRefreshInterval;
      if (shouldRefreshDelay && previousCursor) {
        if (!isLoadingOrRefreshingMessageList) {
          loadPreviousPage(previousCursor);
        }
        setLastUpdate(now);
      }
    }, [
      isLoadingOrRefreshingMessageList,
      lastUpdate,
      loadPreviousPage,
      previousCursor
    ])
  );

  useEffect(() => {
    if (error) {
      IOToast.warning(I18n.t("global.genericError"));
    }
  }, [error]);

  const refreshControl = shouldUseLoad ? (
    <RefreshControl
      refreshing={shouldShowTopRefreshControl}
      onRefresh={() => {
        if (isLoadingOrRefreshingMessageList) {
          return;
        }
        setIsRefreshFromUser(true);
        reloadAll();
      }}
    />
  ) : undefined;

  const renderMessageItem = useCallback(
    ({ item: message }: ListRenderItemInfo<UIMessage>) => (
      <MessageListItem
        category={message.category}
        isRead={message.isRead}
        message={message}
        onPress={onPressItem}
        onLongPress={() => onLongPress(message)}
        isSelectionModeEnabled={!!selectedMessageIds}
        isSelected={!!selectedMessageIds?.has(message.id)}
      />
    ),
    [onLongPress, onPressItem, selectedMessageIds]
  );

  return (
    <>
      <Animated.FlatList
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={renderEmptyList({
          error,
          EmptyComponent: didLoad ? ListEmptyComponent : null
        })()}
        data={messages}
        initialNumToRender={pageSize}
        keyExtractor={(message: UIMessage): string => message.id}
        ref={flatListRef}
        refreshControl={refreshControl}
        refreshing={isLoadingOrRefreshingMessageList}
        renderItem={renderMessageItem}
        scrollEnabled={true}
        scrollEventThrottle={animated?.scrollEventThrottle}
        style={styles.padded}
        getItemLayout={(
          _: ArrayLike<UIMessage> | null | undefined,
          index: number
        ) => generateItemLayout(messages.length)(index)}
        onScroll={(...args) => {
          animated.onScroll(...args);
        }}
        onLayout={handleOnLayoutChange}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.25}
        testID={testID}
        ListFooterComponent={shouldShowFooterLoader ? <Loader /> : null}
      />
    </>
  );
};

const mapStateToProps = (state: GlobalState, { filter }: OwnProps) => {
  const archived = filter.getArchived ?? false;
  const paginatedState = archived
    ? allArchiveSelector(state)
    : allInboxSelector(state);
  const error = pot.isError(paginatedState)
    ? paginatedState.error.reason
    : undefined;
  const messagesPage = pot.getOrElse(paginatedState, undefined);
  const didLoad = pot.isSome(paginatedState);
  return {
    allMessages: messagesPage?.page,
    testID: `MessageList_${archived ? "archive" : "inbox"}`,
    error,
    isLoadingMore: archived
      ? isLoadingArchiveNextPage(state)
      : isLoadingInboxNextPage(state),
    isLoadingPrevious: archived
      ? isLoadingArchivePreviousPage(state)
      : isLoadingInboxPreviousPage(state),
    isReloadingAll: archived
      ? isReloadingArchive(state)
      : isReloadingInbox(state),
    didLoad,
    nextCursor: messagesPage?.next,
    previousCursor: messagesPage?.previous
  };
};

const mapDispatchToProps = (dispatch: Dispatch, { filter }: OwnProps) => ({
  /**
   * Perform a complete refresh of the page, discarding the existing state.
   */
  reloadAll: () => {
    dispatch(reloadAllMessages.request({ pageSize, filter }));
  },

  loadNextPage: (cursor: string) => {
    dispatch(loadNextPageMessages.request({ pageSize, cursor, filter }));
  },
  /**
   * We load the maximum amount of messages because we don't actually support
   * true backwards pagination. Is just to refresh the data.
   */
  loadPreviousPage: (cursor: string) => {
    dispatch(
      loadPreviousPageMessages.request({
        pageSize: maximumItemsFromAPI,
        cursor,
        filter
      })
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
