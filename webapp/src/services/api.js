import {
  authActionFactory,
  meActionFactory,
  usersActionFactory,
  contactsActionFactory,
  numbersActionFactory,
  callForwardingActionFactory
} from 'dial-core';

import config from 'config';

import JwtTokenHandlerDesktop from 'auth/utils/token-desktop-handler';

const apiEndpoint = config.api.ENDPOINT;
const apiType = 'desktop';

const dialBackendApi = () => ({
  /**
   * Auth
   */
  logout: authActionFactory(apiEndpoint, apiType, JwtTokenHandlerDesktop)
    .logout,
  login: authActionFactory(apiEndpoint, apiType, JwtTokenHandlerDesktop).login,
  refreshAccessToken: authActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).refreshAccessToken,
  /**
   * Me
   */
  getMe: meActionFactory(apiEndpoint, apiType, JwtTokenHandlerDesktop).getMe,
  setUserDoNotDisturb: meActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).setUserDoNotDisturb,
  /**
   * Users
   */
  findUserById: usersActionFactory(apiEndpoint, apiType, JwtTokenHandlerDesktop)
    .findUserById,
  searchUsers: usersActionFactory(apiEndpoint, apiType, JwtTokenHandlerDesktop)
    .searchUsers,
  /**
   * Contacts
   */
  addUserContact: contactsActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).addUserContact,
  removeUserContact: contactsActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).removeUserContact,
  getUserContacts: contactsActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).getUserContacts,
  /**
   * Numbers
   */
  getUserPhoneNumbers: numbersActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).getUserPhoneNumbers,
  /**
   * Call Forwarding
   */
  getCallForwardingStatus: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).getCallForwardingStatus,
  disableCallForwarding: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).disableCallForwarding,
  enableSimultaneousRinging: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).enableSimultaneousRinging,
  enableCallForwarding: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerDesktop
  ).enableCallForwarding
});

export default dialBackendApi;
