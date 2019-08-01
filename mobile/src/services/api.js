import {
  authActionFactory,
  meActionFactory,
  usersActionFactory,
  contactsActionFactory,
  numbersActionFactory,
  callForwardingActionFactory
} from 'dial-core';

import config from '../config';

import JwtTokenHandlerMobile from '../auth/utils/token-mobile-handler';

const apiEndpoint = config.api.ENDPOINT;
const apiType = 'mobile';

const dialBackendApi = () => ({
  /**
   * Auth
   */
  login: authActionFactory(apiEndpoint, apiType, JwtTokenHandlerMobile).login,
  refreshAccessToken: authActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).refreshAccessToken,
  logout: authActionFactory(apiEndpoint, apiType, JwtTokenHandlerMobile).logout,
  /**
   * Me
   */
  getMe: meActionFactory(apiEndpoint, apiType, JwtTokenHandlerMobile).getMe,
  setUserDoNotDisturb: meActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).setUserDoNotDisturb,
  /**
   * Users
   */
  findUserById: usersActionFactory(apiEndpoint, apiType, JwtTokenHandlerMobile)
    .findUserById,
  searchUsers: usersActionFactory(apiEndpoint, apiType, JwtTokenHandlerMobile)
    .searchUsers,
  /**
   * Contacts
   */
  addUserContact: contactsActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).addUserContact,
  removeUserContact: contactsActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).removeUserContact,
  getUserContacts: contactsActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).getUserContacts,
  /**
   * Numbers
   */
  getUserPhoneNumbers: numbersActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).getUserPhoneNumbers,
  /**
   * Call Forwarding
   */
  getCallForwardingStatus: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).getCallForwardingStatus,
  disableCallForwarding: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).disableCallForwarding,
  enableSimultaneousRinging: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).enableSimultaneousRinging,
  enableCallForwarding: callForwardingActionFactory(
    apiEndpoint,
    apiType,
    JwtTokenHandlerMobile
  ).enableCallForwarding
});

export default dialBackendApi;
