import * as actions from "calls/actions/dialpad";

describe("dialpad actions", () => {
  it("should create an action to toggle dialpad", () => {
    const expectedAction = {
      type: actions.TOGGLE_DIALPAD
    };
    expect(actions.toggleDialpad()).toEqual(expectedAction);
  });
});
