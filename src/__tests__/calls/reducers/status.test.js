import * as actions from "calls/actions/status";
import reducer from "calls/reducers/status";

describe("status reducer", () => {

  it("should handle SET_AVAILABLE", () => {
    expect(
      reducer('available',
        {
          type: actions.SET_AVAILABLE
        }
      )
    ).toEqual('available');
  });


  it("should handle SET_INVISIBLE", () => {
    expect(
      reducer('available',
        {
          type: actions.SET_INVISIBLE
        }
      )
    ).toEqual('invisible');
  });

  it("should handle SET_DO_NOT_DISTURB", () => {
    expect(
      reducer('available',
        {
          type: actions.SET_DO_NOT_DISTURB
        }
      )
    ).toEqual('do_not_disturb');
  });


});
