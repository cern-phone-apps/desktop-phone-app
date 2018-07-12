import * as me from 'login/actions/me'

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  mobile: null,
  phone: null,
  username: null
}

/**
 * Reducer used to set the current logged in user information.
 *
 * @param state User state
 * @param action Action that will be triggered
 * @returns {*} A dict with the new state
 */
export default (state = initialState, action) => {
  console.debug('echo reducer')
  switch (action.type) {
    case me.ME_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        mobile: action.payload.mobile,
        phone: action.payload.phone,
        username: action.payload.username,
      }
    default:
      return state
  }
}
