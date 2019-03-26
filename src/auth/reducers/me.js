import * as me from 'auth/actions/me'

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  mobile: null,
  phone: null,
  username: null,
  error: {},
  fetching: false
}

/**
 * Reducer used to set the current logged in user information.
 *
 * @param state User state
 * @param action Action that will be triggered
 * @returns {*} A dict with the new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case me.ME_REQUEST:
      return {
        ...state,
        fetching: true,
        error: {}
      }
    case me.ME_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        mobile: action.payload.mobile,
        phone: action.payload.phone,
        username: action.payload.username,
        error: {},
        fetching: false
      }
    case me.ME_FAILURE:
      return {
        ...state,
        email: null,
        firstName: null,
        lastName: null,
        mobile: null,
        phone: null,
        username: null,
        error: action.payload.error,
        fetching: false
      }
    default:
      return state
  }
}
