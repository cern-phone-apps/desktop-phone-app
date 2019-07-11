import { RSAA } from 'redux-api-middleware';
import { JwtTokenHandlerWeb, JwtTokenHandlerMobile, JwtTokenHandlerDesktop } from '../util/tokens';

export const GET_CONTACTS_REQUEST = '@@contacts/GET_CONTACTS_REQUEST';
export const GET_CONTACTS_SUCCESS = '@@contacts/GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAILURE = '@@contacts/GET_CONTACTS_FAILURE';

export const ADD_CONTACTS_REQUEST = '@@contacts/ADD_CONTACTS_REQUEST';
export const ADD_CONTACTS_SUCCESS = '@@contacts/ADD_CONTACTS_SUCCESS';
export const ADD_CONTACTS_FAILURE = '@@contacts/ADD_CONTACTS_FAILURE';

export const REMOVE_CONTACTS_REQUEST = '@@contacts/REMOVE_CONTACTS_REQUEST';
export const REMOVE_CONTACTS_SUCCESS = '@@contacts/REMOVE_CONTACTS_SUCCESS';
export const REMOVE_CONTACTS_FAILURE = '@@contacts/REMOVE_CONTACTS_FAILURE';

export const SELECT_CONTACT = '@@contacts/SELECT_CONTACT';
export const UNSELECT_CONTACT = '@@contacts/UNSELECT_CONTACT';

export const GET_CONTACTS_PROFILE_REQUEST =
  '@@contacts/GET_CONTACTS_PROFILE_REQUEST';
export const GET_CONTACTS_PROFILE_SUCCESS =
  '@@contacts/GET_CONTACTS_PROFILE_SUCCESS';
export const GET_CONTACTS_PROFILE_FAILURE =
  '@@contacts/GET_CONTACTS_PROFILE_FAILURE';

export const OPEN_EMERGENCY_MODAL = '@@contacts/OPEN_EMERGENCY_MODAL';
export const CLOSE_EMERGENCY_MODAL = '@@contacts/CLOSE_EMERGENCY_MODAL';

const API_PATH = '/api/v1';

export default function(apiEndpoint, type = 'mobile') {
  const buildApiURL = path => `${apiEndpoint}${API_PATH}${path}`;

  let authHandlerClass;
  if (type === 'web') {
    authHandlerClass = JwtTokenHandlerWeb;
  } else if (type === 'desktop') {
    authHandlerClass = JwtTokenHandlerDesktop;
  } else {
    authHandlerClass = JwtTokenHandlerMobile;
  }
  return {
    getUserContacts: () => ({
      [RSAA]: {
        endpoint: buildApiURL('/contacts/'),
        method: 'GET',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        types: [
          GET_CONTACTS_REQUEST,
          GET_CONTACTS_SUCCESS,
          GET_CONTACTS_FAILURE
        ]
      }
    }),

    addUserContact: contact => ({
      [RSAA]: {
        endpoint: buildApiURL('/contacts/'),
        method: 'POST',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(contact),
        types: [
          ADD_CONTACTS_REQUEST,
          ADD_CONTACTS_SUCCESS,
          ADD_CONTACTS_FAILURE
        ]
      }
    }),
    removeUserContact: personId => ({
      [RSAA]: {
        endpoint: buildApiURL('/contacts/'),
        method: 'DELETE',
        credentials: 'include',
        headers: authHandlerClass.withAuth({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ personId }),
        types: [
          REMOVE_CONTACTS_REQUEST,
          REMOVE_CONTACTS_SUCCESS,
          REMOVE_CONTACTS_FAILURE
        ]
      }
    })
  };
}

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

export function openEmergencyModal() {
  return {
    type: OPEN_EMERGENCY_MODAL
  };
}

export function closeEmergencyModal() {
  return {
    type: CLOSE_EMERGENCY_MODAL
  };
}
