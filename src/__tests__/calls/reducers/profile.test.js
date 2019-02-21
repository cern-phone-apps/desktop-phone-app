import * as actions from "calls/actions/profile";
import reducer from "calls/reducers/profile";

describe("profile reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      fetching: false,
      error: undefined,
      profile: {}
    });
  });

  it("should handle PROFILE_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: actions.PROFILE_REQUEST
        }
      )
    ).toEqual({
      fetching: true,
      error: undefined,
      profile: {}
    });
  });

  it("should handle PROFILE_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: actions.PROFILE_SUCCESS,
          payload: {
            result: []
          }
        }
      )
    ).toEqual({
      fetching: false,
      error: undefined,
      profile: []
    });
  });

  it("should handle PROFILE_FAILURE", () => {
    expect(
      reducer(
        {},
        {
          type: actions.PROFILE_FAILURE,
          payload: {
            error: 'error'
          }
        }
      )
    ).toEqual({
      fetching: false,
      error: 'error',
      profile: {}
    });
  });


});
