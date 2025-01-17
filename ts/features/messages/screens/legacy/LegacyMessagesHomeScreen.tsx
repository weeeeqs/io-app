import { IOColors, IOToast } from "@pagopa/io-app-design-system";
import { Millisecond } from "@pagopa/ts-commons/lib/units";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SectionStatusComponent from "../../../../components/SectionStatus";
import { ContextualHelpPropsMarkdown } from "../../../../components/screens/BaseScreenComponent";
import TopScreenComponent from "../../../../components/screens/TopScreenComponent";
import { MIN_CHARACTER_SEARCH_TEXT } from "../../../../components/search/SearchButton";
import { SearchNoResultMessage } from "../../../../components/search/SearchNoResultMessage";
import FocusAwareStatusBar from "../../../../components/ui/FocusAwareStatusBar";
import { useSecuritySuggestionsBottomSheet } from "../../../../hooks/useSecuritySuggestionBottomSheet";
import I18n from "../../../../i18n";
import { sectionStatusSelector } from "../../../../store/reducers/backendStatus";
import {
  isSearchMessagesEnabledSelector,
  searchTextSelector
} from "../../../../store/reducers/search";
import { GlobalState } from "../../../../store/reducers/types";
import {
  setAccessibilityFocus,
  useScreenReaderEnabled
} from "../../../../utils/accessibility";
import { useOnFirstRender } from "../../../../utils/hooks/useOnFirstRender";
import MessageList from "../../components/Home/legacy";
import MessagesSearch from "../../components/Home/legacy/MessagesSearch";
import { useLegacyMessageOpening } from "../../hooks/useLegacyMessageOpening";
import MessagesHomeTabNavigator from "../../navigation/MessagesHomeTabNavigator";
import {
  migrateToPaginatedMessages,
  resetMigrationStatus
} from "../../store/actions";
import {
  allInboxAndArchivedMessagesSelector,
  allPaginatedSelector
} from "../../store/reducers/allPaginated";
import {
  MessagesStatus,
  messagesStatusSelector
} from "../../store/reducers/messagesStatus";
import MigratingMessage from "./MigratingMessage";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "messages.contextualHelpTitle",
  body: "messages.contextualHelpContent"
};

/**
 * Screen to gather and organize the information for the Inbox and SearchMessage views.
 */
const LegacyMessagesHomeScreen = ({
  isSearchEnabled,
  messageSectionStatusActive,
  searchMessages,
  searchText,

  // migration
  messagesStatus,
  migrateMessages,
  migrationStatus,
  requestResetMigrationStatus,
  latestMessageOperation
}: Props) => {
  const needsMigration = Object.keys(messagesStatus).length > 0;
  const { securitySuggestionBottomSheet } =
    useSecuritySuggestionsBottomSheet(false);

  useOnFirstRender(() => {
    if (needsMigration) {
      migrateMessages(messagesStatus);
    }
  });

  useEffect(() => {
    if (!latestMessageOperation) {
      return;
    }

    pipe(
      latestMessageOperation,
      E.foldW(
        l => ({
          operation: l.operation,
          archive: I18n.t("messages.operations.archive.failure"),
          restore: I18n.t("messages.operations.restore.failure"),
          type: "error" as const
        }),
        r => ({
          operation: r,
          archive: I18n.t("messages.operations.archive.success"),
          restore: I18n.t("messages.operations.restore.success"),
          type: "success" as const
        })
      ),
      lmo => IOToast[lmo.type](lmo[lmo.operation])
    );
  }, [latestMessageOperation]);

  const { present, bottomSheet } = useLegacyMessageOpening();

  const isScreenReaderEnabled = useScreenReaderEnabled();

  const statusComponent = (
    <SectionStatusComponent
      sectionKey={"messages"}
      onSectionRef={v => {
        setAccessibilityFocus(v, 100 as Millisecond);
      }}
    />
  );

  return (
    <TopScreenComponent
      accessibilityEvents={{
        disableAccessibilityFocus: messageSectionStatusActive
      }}
      hideBaseHeader={!isSearchEnabled}
      hideSafeArea={isSearchEnabled}
      accessibilityLabel={I18n.t("messages.contentTitle")}
      contextualHelpMarkdown={contextualHelpMarkdown}
      faqCategories={["messages"]}
      isSearchAvailable={{ enabled: true, searchType: "Messages" }}
      appLogo={true}
    >
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={IOColors.white}
      />
      {isScreenReaderEnabled && statusComponent}
      {!isSearchEnabled && (
        <React.Fragment>
          {needsMigration ? (
            <MigratingMessage
              status={migrationStatus}
              onRetry={() => migrateMessages(messagesStatus)}
              onEnd={requestResetMigrationStatus}
            />
          ) : (
            <MessagesHomeTabNavigator />
          )}
        </React.Fragment>
      )}
      {isSearchEnabled &&
        pipe(
          searchText,
          O.map(_ =>
            _.length < MIN_CHARACTER_SEARCH_TEXT ? (
              // eslint-disable-next-line react/jsx-key
              <SearchNoResultMessage errorType="InvalidSearchBarText" />
            ) : (
              // eslint-disable-next-line react/jsx-key
              <MessagesSearch
                messages={searchMessages}
                searchText={_}
                renderSearchResults={results => (
                  <MessageList
                    filter={{}}
                    filteredMessages={results}
                    onPressItem={present}
                  />
                )}
              />
            )
          ),
          O.getOrElse(() => (
            <SearchNoResultMessage errorType="InvalidSearchBarText" />
          ))
        )}
      {!isScreenReaderEnabled && statusComponent}
      {bottomSheet}
      {securitySuggestionBottomSheet}
    </TopScreenComponent>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  isSearchEnabled: isSearchMessagesEnabledSelector(state),
  messageSectionStatusActive:
    sectionStatusSelector("messages")(state) !== undefined,
  searchText: searchTextSelector(state),
  searchMessages: allInboxAndArchivedMessagesSelector(state),
  messagesStatus: messagesStatusSelector(state),
  migrationStatus: allPaginatedSelector(state).migration,
  latestMessageOperation: allPaginatedSelector(state).latestMessageOperation
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  migrateMessages: (messageStatus: MessagesStatus) => {
    dispatch(migrateToPaginatedMessages.request(messageStatus));
  },
  requestResetMigrationStatus: () => dispatch(resetMigrationStatus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LegacyMessagesHomeScreen);
