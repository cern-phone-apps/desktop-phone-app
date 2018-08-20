import * as numbersActions from 'calls/actions/numbers'

const initialState = {
  fetching: false,
  error: undefined,
  activeNumber: false
}

function handleNumbersFailure (state, action) {
  console.log(action)
  let error
  if(action.payload && action.payload.response.result && action.payload.response.result.error){
    error = {message: action.payload.response.result.error.message,
      statusCode: action.payload.response.result.error.code}
  }else{
    error = {message: 'undefined error', statusCode: 401}
  }

  return {
    ...state,
    fetching: false,
    numbers: [],
    error: error
  }
}

/**
 * Reducer used to handle the phone numbers of the current logged in user.
 *
 * @param state Current state of the application
 * @param action
 * @returns {{fetching, numbers, error}} The state with all the user's phone numbers
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

      if(action.payload.result.error){
        return handleNumbersFailure (state, action)
      }

      return {
        ...state,
        fetching: false,
        numbers: action.payload.result,
        error: undefined
      }
    case numbersActions.NUMBERS_FAILURE:
      return handleNumbersFailure(state, action)
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
