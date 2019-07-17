import {
  authActionFactory,
  meActionFactory,
  usersActionFactory,
  contactsActionFactory,
  numbersActionFactory,
  callForwardingActionFactory
} from 'dial-core';

import config from 'config';

const apiEndpoint = 'https://dial-backend-next.web.cern.ch';
const apiType = 'desktop';

const dialBackendApi = () => ({
  /**
   * Auth
   */
  logout: authActionFactory(apiEndpoint, apiType).logout,
  login: authActionFactory(apiEndpoint, apiType).login,
  refreshAccessToken: authActionFactory(apiEndpoint, apiType)
    .refreshAccessToken,
  /**
   * Me
   */
  getMe: meActionFactory(apiEndpoint, apiType).getMe,
  setUserDoNotDisturb: meActionFactory(apiEndpoint, apiType)
    .setUserDoNotDisturb,
  /**
   * Users
   */
  findUserById: usersActionFactory(apiEndpoint, apiType).findUserById,
  searchUsers: usersActionFactory(apiEndpoint, apiType).searchUsers,
  /**
   * Contacts
   */
  addUserContact: contactsActionFactory(apiEndpoint, apiType).addUserContact,
  removeUserContact: contactsActionFactory(apiEndpoint, apiType)
    .removeUserContact,
  getUserContacts: contactsActionFactory(apiEndpoint, apiType).getUserContacts,
  /**
   * Numbers
   */
  getUserPhoneNumbers: numbersActionFactory(apiEndpoint, apiType)
    .getUserPhoneNumbers,
  /**
   * Call Forwarding
   */
  getCallForwardingStatus: callForwardingActionFactory(apiEndpoint, apiType)
    .getCallForwardingStatus,
  disableCallForwarding: callForwardingActionFactory(apiEndpoint, apiType)
    .disableCallForwarding,
  enableSimultaneousRinging: callForwardingActionFactory(apiEndpoint, apiType)
    .enableSimultaneousRinging,
  enableCallForwarding: callForwardingActionFactory(apiEndpoint, apiType)
    .enableCallForwarding
});

export default dialBackendApi;
