import * as statusActions from "calls/actions/status";

const INITIAL_STATE = {
  doNotDisturb: false,
  fetching: false
};

/**
 * Reducer used to handle the user status of the current logged in user.
 *
 * @param state Current state of the application
 * @param action
 * @returns {string} Different states of availability
 */
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case statusActions.SET_DO_NOT_DISTURB_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case statusActions.SET_DO_NOT_DISTURB_SUCCESS:
      return {
        ...state,
        fetching: false,
        doNotDisturb: action.payload.result.doNotDisturb
      };
    case statusActions.SET_DO_NOT_DISTURB_FAILURE:
      return {
        ...state,
        fetching: false,
        error: "Error updating do not disturb "
      };
    default:
      return state;
  }
};

export default user;
