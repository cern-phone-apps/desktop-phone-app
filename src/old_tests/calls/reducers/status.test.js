import * as actions from "calls/actions/status";
import reducer from "calls/reducers/status";

describe("status reducer", () => {

  it("should handle SET_DO_NOT_DISTURB_REQUEST", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SET_DO_NOT_DISTURB_REQUEST,
        }
      )
    ).toEqual({
      fetching: true,
    });
  });

  it("should handle SET_DO_NOT_DISTURB_SUCCESS", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SET_DO_NOT_DISTURB_SUCCESS,
          payload: {
            result: {
              doNotDisturb: true
            }
          }
        }
      )
    ).toEqual({
      fetching: false,
      doNotDisturb: true
    });
  });

  it("should handle SET_DO_NOT_DISTURB_FAILURE", () => {
    expect(
      reducer(
        {},
        {
          type: actions.SET_DO_NOT_DISTURB_FAILURE,
          payload: {
            result: {
              doNotDisturb: true
            }
          }
        }
      )
    ).toEqual({
      fetching: false,
      doNotDisturb: true
    });
  });

});
