import * as actions from "calls/actions/connection";

describe("connection actions", () => {
  it("should create an action to connect to sip", () => {
    const expectedAction = {
      type: actions.CONNECT_REQUEST
    };
    expect(actions.requestConnection()).toEqual(expectedAction);
  });

  it("should create an action for successfully connection", () => {
    const expectedAction = {
      type: actions.CONNECT_SUCCESS
    };
    expect(actions.setConnected()).toEqual(expectedAction);
  });

  it("should create an action for failed connection", () => {
    const errors = { error: "This an error" };
    const expectedAction = {
      errors,
      type: actions.CONNECT_FAILURE
    };
    expect(actions.setConnectionFailure(errors)).toEqual(expectedAction);
  });
});
