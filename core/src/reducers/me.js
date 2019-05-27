import * as meActions from '../actions/me';

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  mobile: null,
  phone: null,
  username: null,
  personId: null,
  error: {},
  fetching: false,
  doNotDisturb: false
};

/**
 * Reducer used to set the current logged in user information.
 *
 * @param state User state
 * @param action Action that will be triggered
 * @returns {*} A dict with the new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case meActions.ME_REQUEST:
      return {
        ...state,
        fetching: true,
        error: {}
      };
    case meActions.ME_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        mobile: action.payload.mobile,
        phone: action.payload.phone,
        username: action.payload.username,
        doNotDisturb: action.payload.doNotDisturb,
        personId: action.payload.personId,
        error: {},
        fetching: false
      };
    case meActions.ME_FAILURE:
      return {
        ...state,
        email: null,
        firstName: null,
        lastName: null,
        mobile: null,
        phone: null,
        username: null,
        personId: null,
        doNotDisturb: null,
        error: action.payload.error,
        fetching: false
      };
    default:
      return state;
  }
};
