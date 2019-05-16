import * as numbersActions from '../actions/numbers';

const initialState = {
  fetching: false,
  error: undefined,
  activeNumber: undefined,
  numbers: []
};

function handleNumbersFailure(state, action) {
  let error;
  if (
    action.payload &&
    action.payload.response &&
    action.payload.response.result &&
    action.payload.response.result.error
  ) {
    error = {
      message: action.payload.response.result.error.message,
      statusCode: action.payload.response.result.error.code
    };
  } else {
    error = { message: 'undefined error', statusCode: 401 };
  }

  return {
    ...state,
    fetching: false,
    numbers: [],
    error
  };
}

function handleServerError(state, action) {
  console.log(`Handle Server ERROR`);
  let message;
  let statusCode;
  if (action.payload.message) {
    if (action.payload.name === 'RequestError') {
      message = 'Dial backend is not currently available.';
      statusCode = 31;
    } else if (action.payload.name === 'ApiError') {
      message = action.payload.message;
      statusCode = action.payload.status ? action.payload.status : -1;
    } else {
      message = action.payload.message;
      statusCode = -1;
    }
  } else {
    message = 'Unknown error';
    statusCode = 999;
  }

  return {
    ...state,
    error: { message, statusCode }
  };
}

/**
 * Reducer used to handle the phone numbers of the current logged in user.
 *
 * @param state Current state of the application
 * @param action
 * @returns {{fetching, numbers, error}} The state with all the user's phone numbers
 */
export default (state = initialState, action) => {
  console.log('NUMBERS REDUCER');
  switch (action.type) {
    case numbersActions.NUMBERS_REQUEST:
      if (action.error) {
        return handleServerError(state, action);
      }

      return {
        ...state,
        fetching: true,
        error: undefined
      };
    case numbersActions.NUMBERS_SUCCESS:
      if (action.payload.result.error) {
        return handleNumbersFailure(state, action);
      }

      return {
        ...state,
        fetching: false,
        numbers: action.payload.result,
        error: undefined
      };
    case numbersActions.NUMBERS_FAILURE:
      return handleNumbersFailure(state, action);
    case numbersActions.NUMBERS_SET_ACTIVE:
      return {
        ...state,
        activeNumber: action.phoneNumber
      };
    default:
      return state;
  }
};
