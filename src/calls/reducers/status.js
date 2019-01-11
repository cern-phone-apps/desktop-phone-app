import * as statusActions from 'calls/actions/status'

const initialState = 'available'

/**
 * Reducer used to handle the user status of the current logged in user.
 *
 * @param state Current state of the application
 * @param action
 * @returns {string} Different states of availability
 */
const user = (state = initialState, action) => {
  switch (action.type) {
    case statusActions.SET_AVAILABLE:
      return 'available'
    case statusActions.SET_INVISIBLE:
      return 'invisible'
    case statusActions.SET_DO_NOT_DISTURB:
      return 'do_not_disturb'
    default:
      return state
  }
}

export default user
