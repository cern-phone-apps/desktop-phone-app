import { RSAA } from "redux-api-middleware";
import { withAuth } from "auth/utils/tokens";
//import { PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS } from "calls/actions/profile";

export const GET_CONTACTS_REQUEST = "@@contacts/GET_CONTACTS_REQUEST";
export const GET_CONTACTS_SUCCESS = "@@contacts/GET_CONTACTS_SUCCESS";
export const GET_CONTACTS_FAILURE = "@@contacts/GET_CONTACTS_FAILURE";

export const ADD_CONTACTS_REQUEST = "@@contacts/ADD_CONTACTS_REQUEST";
export const ADD_CONTACTS_SUCCESS = "@@contacts/ADD_CONTACTS_SUCCESS";
export const ADD_CONTACTS_FAILURE = "@@contacts/ADD_CONTACTS_FAILURE";

export const REMOVE_CONTACTS_REQUEST = "@@contacts/REMOVE_CONTACTS_REQUEST";
export const REMOVE_CONTACTS_SUCCESS = "@@contacts/REMOVE_CONTACTS_SUCCESS";
export const REMOVE_CONTACTS_FAILURE = "@@contacts/REMOVE_CONTACTS_FAILURE";

export const SELECT_CONTACT = "@@contacts/SELECT_CONTACT";
export const UNSELECT_CONTACT = "@@contacts/UNSELECT_CONTACT";

export const GET_CONTACTS_PROFILE_REQUEST = "@@contacts/GET_CONTACTS_PROFILE_REQUEST";
export const GET_CONTACTS_PROFILE_SUCCESS = "@@contacts/GET_CONTACTS_PROFILE_SUCCESS";
export const GET_CONTACTS_PROFILE_FAILURE = "@@contacts/GET_CONTACTS_PROFILE_FAILURE";

export const buildCallsApiEndpoint = path => {
  return `${process.env.REACT_APP_API_ENDPOINT}${path}`;
};

/**
 * Action that triggers a retrieval of the user's phones on the backend.
 * It requires authentication with access token
 *
 * @param name username of the user to search
 * @returns {{}} The RSAA action
 */
export const getUserContacts = () => ({
  [RSAA]: {
    endpoint: buildCallsApiEndpoint("/api/v1/contacts/"),
    method: "GET",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [GET_CONTACTS_REQUEST, GET_CONTACTS_SUCCESS, GET_CONTACTS_FAILURE]
  }
});


export const addUserContact = (contact) => ({
  [RSAA]: {
    endpoint: buildCallsApiEndpoint("/api/v1/contacts/"),
    method: "POST",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    body: JSON.stringify(contact),
    types: [ADD_CONTACTS_REQUEST, ADD_CONTACTS_SUCCESS, ADD_CONTACTS_FAILURE]
  }
});

export const removeUserContact = (personId) => ({
  [RSAA]: {
    endpoint: buildCallsApiEndpoint("/api/v1/contacts/"),
    method: "DELETE",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    body: JSON.stringify({personId: personId}),
    types: [REMOVE_CONTACTS_REQUEST, REMOVE_CONTACTS_SUCCESS, REMOVE_CONTACTS_FAILURE]
  }
});

export function selectContact(contact) {
  return {
    contact,
    type: SELECT_CONTACT
  };
}

export function unSelectContact(contact) {
  return {
    contact,
    type: UNSELECT_CONTACT
  };
}

export const getUserProfileById = personId => ({
  [RSAA]: {
    endpoint: buildCallsApiEndpoint(`/api/v1/users/?personId=${personId}`),
    method: "GET",
    credentials: "include",
    headers: withAuth({ "Content-Type": "application/json" }),
    types: [GET_CONTACTS_PROFILE_REQUEST, GET_CONTACTS_PROFILE_SUCCESS, GET_CONTACTS_PROFILE_FAILURE]
  }
});