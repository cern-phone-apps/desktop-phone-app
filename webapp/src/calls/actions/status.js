import { RSAA } from "redux-api-middleware";
import { buildCallsApiEndpoint } from "calls/actions/numbers";
import { withAuth } from "auth/utils/tokens";

export const SET_DO_NOT_DISTURB_REQUEST = "@@status/SET_DO_NOT_DISTURB_REQUEST";
export const SET_DO_NOT_DISTURB_SUCCESS = "@@status/SET_DO_NOT_DISTURB_SUCCESS";
export const SET_DO_NOT_DISTURB_FAILURE = "@@status/SET_DO_NOT_DISTURB_SUCCESS";

export const setUserDoNotDisturb = value => ({
  [RSAA]: {
    endpoint: `${buildCallsApiEndpoint("/api/v1/users/me/")}`,
    method: "PUT",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    body: JSON.stringify({doNotDisturb: value}),
    types: [
      SET_DO_NOT_DISTURB_REQUEST,
      SET_DO_NOT_DISTURB_SUCCESS,
      SET_DO_NOT_DISTURB_FAILURE
    ]
  }
});
