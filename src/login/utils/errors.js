/**
 * Creates a dict with error format
 * @param message (string) Message that will be displayed
 * @param statusCode (int) Error code
 * @returns {{message: string, statusCode: number}}
 */
export const buildError = (message = "Unknown error", statusCode = 999) => {
  return { message, statusCode };
};

/**
 * Creates a dict with error format from an Redux Api Middleware action
 * @param action Redux API middleware action
 * @returns {{message: *, statusCode: number}}
 */
export const buildApiErrorFromAction = action => {
  const message = action.payload.message;
  const statusCode = action.payload.status ? action.payload.status : -1;
  return { message, statusCode };
};

/**
 * Handles a given action as an error
 * @param action RAM Action expected to be an error
 * @param defaultErrorMessage (string) Default Message that will be displayed
 * @returns {{message: string, statusCode: number}|{message: *, statusCode: number}}
 */
export const handleErrorResponse = (
  action,
  defaultErrorMessage = "Dial backend is not currently available."
) => {
  let response;
  switch (action.payload.name) {
    case "RequestError":
      response = buildError(defaultErrorMessage, 31);
      break;
    case "ApiError":
      response = buildApiErrorFromAction(action);
      break;
    default:
      response = buildError(action.payload.message, -1);
      break;
  }
  return response;
};

/**
 *
 * @param state
 * @param action
 * @returns {{[p: string]: *}}
 */
export const handleErrorWithToken = (state, action) => {
  let response;
  if (!action.payload || !action.payload.message || !action.payload.name) {
    response = buildError();
  } else {
    response = handleErrorResponse(action);
  }

  return {
    ...state,
    error: response
  };
};

export const handleErrorWithLogin = (state, action) => {
  let response;
  if (!action.payload) {
    response = buildError();
  } else {
    if (action.payload.message && action.payload.name) {
      response = handleErrorResponse(
        action,
        "Currently It is not possible to log in. Please, try again in a few minutes."
      );
    }
  }
  return {
    ...state,
    loginInProgress: false,
    error: response
  };
};

/**
 * Gets the errors from the state
 * @param state An state dict
 * @returns {*} A dict of errors
 */
export const errors = state => {
  return state.error;
};
