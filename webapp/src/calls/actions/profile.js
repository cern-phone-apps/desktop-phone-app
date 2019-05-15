import { RSAA } from "redux-api-middleware";
import { withAuth } from "auth/utils/tokens";
import { buildCallsApiEndpoint } from "calls/actions/numbers";

export const PROFILE_REQUEST = "@@search/PROFILE_REQUEST";
export const PROFILE_SUCCESS = "@@search/PROFILE_SUCCESS";
export const PROFILE_FAILURE = "@@search/PROFILE_FAILURE";

export const getUserProfile = name => ({
  [RSAA]: {
    endpoint: `${buildCallsApiEndpoint("/api/v1/users/")}?username=${name}`,
    method: "GET",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
  }
});

export const getUserProfileById = personId => ({
  [RSAA]: {
    endpoint: buildCallsApiEndpoint(`/api/v1/contacts/?personId=${personId}`),
    method: "GET",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE]
  }
});
