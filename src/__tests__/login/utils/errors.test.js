import React from "react";
import {
  buildApiErrorFromAction,
  buildError, errors,
  handleErrorResponse,
  handleErrorWithLogin,
  handleErrorWithToken
} from "login/utils/errors";

it("generates a default error", () => {
  const error = buildError();
  expect(error).toEqual({ message: "Unknown error", statusCode: 999 });
});

it("generates a custom error", () => {
  const error = buildError("Error message", 1234);
  expect(error).toEqual({ message: "Error message", statusCode: 1234 });
});

it("generates error from action", () => {
  const action = {
    payload: {
      message: "Hello Error",
      status: 12345
    }
  };

  const error = buildApiErrorFromAction(action);
  expect(error).toEqual({ message: "Hello Error", statusCode: 12345 });
});

it("handles an error response RequestError", () => {
  const action = {
    payload: {
      name: "RequestError",
      message: "Hello Error",
      status: 12345
    }
  };

  const error = handleErrorResponse(action);
  expect(error).toEqual({
    message: "Dial backend is not currently available.",
    statusCode: 31
  });
});

it("handles an error response ApiError", () => {
  const action = {
    payload: {
      name: "ApiError",
      message: "Hello Error",
      status: 12345
    }
  };

  const error = handleErrorResponse(action);
  expect(error).toEqual({ message: "Hello Error", statusCode: 12345 });
});

it("handles an error response UnknownError", () => {
  const action = {
    payload: {
      name: "UnknownError",
      message: "Hello Error",
      status: 12345
    }
  };

  const error = handleErrorResponse(action);
  expect(error).toEqual({ message: "Hello Error", statusCode: -1 });
});

it("handles an unknown error with Token", () => {
  let state = {};
  const action = {
    payload: {
      name: "UnknownError",
      message: "Hello Error",
      status: 12345
    }
  };

  const error = handleErrorWithToken(state, action);
  expect(error).toEqual({ error: { message: "Hello Error", statusCode: -1 } });
});

it("handles an unknown error with Login", () => {
  let state = {};
  const action = {
    payload: {
      name: "UnknownError",
      message: "Hello Error",
      status: 12345
    }
  };

  const error = handleErrorWithLogin(state, action);
  expect(error).toEqual({
    error: { message: "Hello Error", statusCode: -1 },
    loginInProgress: false
  });
});

it("handles a RequestError error with Login", () => {
  let state = {};
  const action = {
    payload: {
      name: "RequestError",
      message: "Hello Error",
      status: 12345
    }
  };

  const error = handleErrorWithLogin(state, action);
  expect(error).toEqual({
    error: {
      message:
        "Currently It is not possible to log in. Please, try again in a few minutes.",
      statusCode: 31
    },
    loginInProgress: false
  });
});

it("returns error key from state", () => {
  let state = {
    error: true
  };
  const error = errors(state);
  expect(error).toEqual(true);
});
