import * as authActions from "login/actions/auth";
import reducer, {
  handleLoginRequest,
  handleLogoutRequest,
  handleTokenRequest
} from "login/reducers/auth";
import { LOGIN_REQUEST } from "login/actions/auth";
import { TOKEN_REQUEST } from "login/actions/auth";
import { LOGOUT_REQUEST } from "login/actions/auth";

it("should handle a login request", () => {
  let initialState = {
    loggedIn: false,
    loginInProgress: false,
    error: {}
  };

  const action = {
    name: LOGIN_REQUEST,
    payload: {}
  };

  const result = handleLoginRequest(initialState, action);

  expect(result).toEqual({ error: {}, loggedIn: false, loginInProgress: true });
});

it("should handle an ERROR login request", () => {
  let initialState = {
    loggedIn: false,
    loginInProgress: false,
    error: {}
  };

  const action = {
    name: LOGIN_REQUEST,
    error: true
  };

  const result = handleLoginRequest(initialState, action);

  expect(result).toEqual({
    error: { message: "Unknown error", statusCode: 999 },
    loggedIn: false,
    loginInProgress: false
  });
});

it("should handle a token request", () => {
  let initialState = {
    loggedIn: false,
    loginInProgress: false,
    error: {}
  };

  const action = {
    name: TOKEN_REQUEST,
    payload: {}
  };

  const result = handleTokenRequest(initialState, action);

  expect(result).toEqual(initialState);
});

it("should handle an ERROR token request", () => {
  let initialState = {
    loggedIn: false,
    loginInProgress: false,
    error: {}
  };

  const action = {
    name: TOKEN_REQUEST,
    error: true
  };

  const result = handleTokenRequest(initialState, action);

  expect(result).toEqual({
    error: { message: "Unknown error", statusCode: 999 },
    loggedIn: false,
    loginInProgress: false
  });
});
it("should handle a logout request", () => {
  let initialState = {
    loggedIn: false,
    loginInProgress: false,
    error: {}
  };

  const action = {
    name: LOGOUT_REQUEST,
    payload: {}
  };

  const result = handleLogoutRequest(initialState, action);

  expect(result).toEqual(initialState);
});

it("should handle an ERROR logout request", () => {
  let initialState = {
    loggedIn: false,
    loginInProgress: false,
    error: {}
  };

  const action = {
    name: LOGOUT_REQUEST,
    error: true
  };

  const result = handleLogoutRequest(initialState, action);

  expect(result).toEqual({
    error: { message: "Unknown error", statusCode: 999 },
    loggedIn: false,
    loginInProgress: false
  });
});

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      loggedIn: false,
      loginInProgress: false,
      error: {}
    });
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.LOGIN_REQUEST
        }
      )
    ).toEqual({
      loginInProgress: true
    });

    expect(
      reducer(
        {
          loginInProgress: false
        },
        {
          type: authActions.LOGIN_REQUEST
        }
      )
    ).toEqual({
      loginInProgress: true
    });
  });

  it("should handle TOKEN_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.TOKEN_REQUEST
        }
      )
    ).toEqual({});

    expect(
      reducer(
        {},
        {
          type: authActions.TOKEN_REQUEST
        }
      )
    ).toEqual({});
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.LOGOUT_REQUEST
        }
      )
    ).toEqual({
      error: {},
      loggedIn: false,
      loginInProgress: false,
      token: undefined
    });

    expect(
      reducer(
        {
          loginInProgress: false
        },
        {
          type: authActions.LOGOUT_REQUEST
        }
      )
    ).toEqual({
      error: {},
      loggedIn: false,
      loginInProgress: false,
      token: undefined
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.LOGIN_SUCCESS,
          payload: {
            login: true
          }
        }
      )
    ).toEqual({
      loggedIn: true,
      loginInProgress: false,
      error: {}
    });

    expect(
      reducer(
        {
          loggedIn: true,
          loginInProgress: false,
          error: {}
        },
        {
          type: authActions.LOGIN_SUCCESS,
          payload: {
            login: true
          }
        }
      )
    ).toEqual({
      loggedIn: true,
      loginInProgress: false,
      error: {}
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.LOGOUT_SUCCESS,
          payload: {
            logout: true
          }
        }
      )
    ).toEqual({
      loggedIn: false
    });

    expect(
      reducer(
        {
          loggedIn: true,
          loginInProgress: false,
          error: {}
        },
        {
          type: authActions.LOGOUT_SUCCESS,
          payload: {
            logout: true
          }
        }
      )
    ).toEqual({ error: {}, loggedIn: false, loginInProgress: false });
  });

  it("should handle TOKEN_RECEIVED", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.TOKEN_RECEIVED,
          payload: {
            login: true
          }
        }
      )
    ).toEqual({
      loggedIn: true,
      loginInProgress: false,
      error: {}
    });

    expect(
      reducer(
        {
          loggedIn: true,
          loginInProgress: false,
          error: {}
        },
        {
          type: authActions.TOKEN_RECEIVED,
          payload: {
            login: true
          }
        }
      )
    ).toEqual({
      loggedIn: true,
      loginInProgress: false,
      error: {}
    });
  });

  it("should handle LOGIN_FAILURE", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.LOGIN_FAILURE,
          payload: {
            response: "An error happened"
          }
        }
      )
    ).toEqual({
      error: { message: "Unknown error", statusCode: 999 }
    });

    expect(
      reducer(
        {
          loggedIn: false,
          loginInProgress: false,
          error: {}
        },
        {
          type: authActions.LOGIN_FAILURE,
          payload: {}
        }
      )
    ).toEqual({
      error: { message: "Unknown error", statusCode: 999 },
      loggedIn: false,
      loginInProgress: false
    });
  });

  it("should handle TOKEN_FAILURE", () => {
    expect(
      reducer(
        {},
        {
          type: authActions.TOKEN_FAILURE,
          payload: {
            response: "An error happened"
          }
        }
      )
    ).toEqual({ error: { message: "Unknown error", statusCode: 999 } });

    expect(
      reducer(
        {
          loggedIn: false,
          loginInProgress: false,
          error: {}
        },
        {
          type: authActions.TOKEN_FAILURE,
          payload: {}
        }
      )
    ).toEqual({
      error: { message: "Unknown error", statusCode: 999 },
      loggedIn: false,
      loginInProgress: false
    });
  });
});
