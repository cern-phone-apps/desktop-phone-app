import { RSAA } from "redux-api-middleware";
import { withAuth } from "login/reducers/auth";
import { buildAuthApiEndpoint } from "login/actions/auth";

export const ME_REQUEST = "@@user/ME_REQUEST";
export const ME_SUCCESS = "@@user/ME_SUCCESS";
export const ME_FAILURE = "@@user/ME_FAILURE";

/**
 * Retrieves the information of the current logged in user.
 * Needs to be authenticated with access token.
 *
 * @returns {{}} A RSAA request
 */
export const getMe = () => ({
  [RSAA]: {
    endpoint: buildAuthApiEndpoint("/api/v1/users/me/"),
    method: "GET",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [ME_REQUEST, ME_SUCCESS, ME_FAILURE]
  }
});
