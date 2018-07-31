import * as numbersActions from 'calls/actions/numbers'

const initialState = {
  fetching: false,
  error: undefined,
  activeNumber: false
}

/**
 * Reducer used to handle the phone numbers of the current logged in user.
 *
 * @param state Current state of the application
 * @param action
 * @returns {string} The state with all the user's phone numbers
 */
const numbersReducer = (state = initialState, action) => {
  switch (action.type) {
    case numbersActions.NUMBERS_REQUEST:
      return {
        ...state,
        fetching: true,
        numbers: [],
        error: undefined
      }
    case numbersActions.NUMBERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        numbers: action.payload.result,
        error: undefined
      }
    case numbersActions.NUMBERS_FAILURE:
      return {
        ...state,
        fetching: false,
        numbers: [],
        error: action.payload.error
      }
    case numbersActions.NUMBERS_SET_ACTIVE:
      return {
        ...state,
        activeNumber: action.phoneNumber
      }
    default:
      return state
  }
}

export default numbersReducer
