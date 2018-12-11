import * as actions from "calls/actions/numbers";
import reducer from "calls/reducers/numbers";

describe("numbers reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      fetching: false,
      error: undefined,
      activeNumber: undefined
    });
  });

  it("should handle NUMBERS_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: actions.NUMBERS_REQUEST
        }
      )
    ).toEqual({ error: undefined, fetching: true });
  });

  it("should handle NUMBERS_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: actions.NUMBERS_SUCCESS,
          payload: {
            result: []
          }
        }
      )
    ).toEqual({ error: undefined, fetching: false, numbers: [] });
  });

  it("should handle NUMBERS_SUCCESS with error", () => {
    expect(
      reducer(
        {},
        {
          // action.payload.response.result && action.payload.response.result.error
          type: actions.NUMBERS_SUCCESS,
          payload: {
            result: {
              error: true
            },
            response: {
              result: {
                error: {
                  code: 1,
                  message: "bla bla bla"
                }
              }
            }
          }
        }
      )
    ).toEqual({
      error: {
        message: "bla bla bla",
        statusCode: 1
      },
      fetching: false,
      numbers: []
    });
  });

  it("should handle NUMBERS_SUCCESS with undefined error", () => {
    expect(
      reducer(
        {},
        {
          // action.payload.response.result && action.payload.response.result.error
          type: actions.NUMBERS_SUCCESS,
          payload: {
            result: {
              error: true
            },
            response: {}
          }
        }
      )
    ).toEqual({
      error: {
        message: "undefined error",
        statusCode: 401
      },
      fetching: false,
      numbers: []
    });
  });

  it("should handle NUMBERS_FAILURE", () => {
    expect(
      reducer(
        {},
        {
          type: actions.NUMBERS_FAILURE,
          payload: {
            result: {
              error: true
            },
            response: {}
          }
        }
      )
    ).toEqual({
      error: {
        message: "undefined error",
        statusCode: 401
      },
      fetching: false,
      numbers: []
    });
  });

  it("should handle NUMBERS_SET_ACTIVE", () => {
    expect(
      reducer(
        {},
        {
          type: actions.NUMBERS_SET_ACTIVE,
          phoneNumber: "1234"
        }
      )
    ).toEqual({ activeNumber: "1234" });
  });
});
