import { RSAA } from "redux-api-middleware";
import { buildCallsApiEndpoint } from "calls/actions/numbers";
import { withAuth } from "auth/utils/tokens";

export const ADD_LOCAL_FORWARD_NUMBER = "@@settings/ADD_LOCAL_FORWARD_NUMBER";

export const CALL_FORWARDING_REQUEST = "@@settings/CALL_FORWARDING_REQUEST";
export const CALL_FORWARDING_SUCCESS = "@@settings/CALL_FORWARDING_SUCCESS";
export const CALL_FORWARDING_FAILURE = "@@settings/CALL_FORWARDING_FAILURE";

export function addLocalForwardNumber(number) {
  return {
    number,
    type: ADD_LOCAL_FORWARD_NUMBER
  };
}

export const getCallForwardingStatus = () => ({
  [RSAA]: {
    endpoint: buildCallsApiEndpoint("/api/v1/call-forwarding/"),
    method: "GET",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [CALL_FORWARDING_REQUEST, CALL_FORWARDING_SUCCESS, CALL_FORWARDING_FAILURE]
  }
});
