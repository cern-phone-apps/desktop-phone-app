import { logMessage } from "common/utils";

/**
 * Handles the error with the token
 * @param state
 * @param action
 * @returns {{[p: string]: *}}
 */
export function handleErrorWithToken (state, action) {
  let message;
  let statusCode;
  logMessage(action);

  if (action.payload.message) {
    if (action.payload.name === "RequestError") {
      message = "Dial backend is not currently available.";
      statusCode = 31;
    } else if (action.payload.name === "ApiError") {
      message = action.payload.message;
      statusCode = action.payload.status ? action.payload.status : -1;
    } else {
      message = action.payload.message;
      statusCode = -1;
    }
  } else {
    message = "Unknown error";
    statusCode = 999;
  }
  return {
    ...state,
    error: { message: message, statusCode: statusCode }
  };
}

export function handleErrorWithLogin (state, action) {
  let message;
  let statusCode;
  logMessage(action);

  if (action.payload.message) {
    if (action.payload.name === "RequestError") {
      message = "Currently It is not possible to log in. Please, try again in a few minutes.";
      statusCode = 31;
    } else if (action.payload.name === "ApiError") {
      message = action.payload.message;
      statusCode = action.payload.status ? action.payload.status : -1;
    } else {
      message = action.payload.message;
      statusCode = -1;
    }
  } else {
    message = "Unknown error";
    statusCode = 999;
  }
  return {
    ...state,
    loginInProgress: false,
    error: { message: message, statusCode: statusCode }
  };
}

/**
 * Gets the errors from the state
 * @param state An state dict
 * @returns {*} A dict of errors
 */
export function errors (state) {
  return state.error;
}