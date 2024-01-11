import { call, put, takeLatest } from "typed-redux-saga/macro";
import { ActionType, getType } from "typesafe-actions";
import { BackendClient } from "../../../api/backend";
import { loadPreviousPageMessages as loadPreviousPageMessagesAction } from "../store/actions";
import { ReduxSagaEffect, SagaCallReturnType } from "../../../types/utils";
import { toUIMessage } from "../store/reducers/transformers";
import { PaginatedPublicMessagesCollection } from "../../../../definitions/backend/PaginatedPublicMessagesCollection";
import { isTestEnv } from "../../../utils/environment";
import { convertUnknownToError, getError } from "../../../utils/errors";
import { withRefreshApiCall } from "../../fastLogin/saga/utils";
import { errorToReason, unknownToReason } from "../utils";
import { trackLoadPreviousPageMessagesFailure } from "../analytics";
import { handleResponse } from "../utils/responseHandling";

type LocalActionType = ActionType<
  (typeof loadPreviousPageMessagesAction)["request"]
>;
type LocalBeClient = ReturnType<typeof BackendClient>["getMessages"];

export default function* watcher(
  getMessages: LocalBeClient
): Generator<ReduxSagaEffect, void, SagaCallReturnType<typeof getMessages>> {
  yield* takeLatest(
    getType(loadPreviousPageMessagesAction.request),
    tryLoadPreviousPageMessages(getMessages)
  );
}

function tryLoadPreviousPageMessages(getMessages: LocalBeClient) {
  return function* gen(
    action: LocalActionType
  ): Generator<ReduxSagaEffect, void, SagaCallReturnType<typeof getMessages>> {
    const { filter, cursor, pageSize } = action.payload;
    try {
      const response = (yield* call(
        withRefreshApiCall,
        getMessages({
          enrich_result_data: true,
          page_size: pageSize,
          minimum_id: cursor,
          archived: filter.getArchived
        }),
        action
      )) as unknown as SagaCallReturnType<typeof getMessages>;
      const nextAction = handleResponse<PaginatedPublicMessagesCollection>(
        response,
        ({ items, prev }: PaginatedPublicMessagesCollection) =>
          loadPreviousPageMessagesAction.success({
            messages: items.map(toUIMessage),
            pagination: { previous: prev },
            filter
          }),
        error => {
          const reason = errorToReason(error);
          trackLoadPreviousPageMessagesFailure(reason);
          return loadPreviousPageMessagesAction.failure({
            error: getError(error),
            filter
          });
        }
      );

      if (nextAction) {
        yield* put(nextAction);
      }
    } catch (e) {
      const reason = unknownToReason(e);
      trackLoadPreviousPageMessagesFailure(reason);
      yield* put(
        loadPreviousPageMessagesAction.failure({
          error: convertUnknownToError(e),
          filter
        })
      );
    }
  };
}

export const testTryLoadPreviousPageMessages = isTestEnv
  ? tryLoadPreviousPageMessages
  : undefined;