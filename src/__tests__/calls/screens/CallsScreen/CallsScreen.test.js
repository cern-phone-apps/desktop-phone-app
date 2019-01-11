import React from "react";
import { CallsScreen } from "calls/screens/CallsScreen/CallsScreen";

describe("CallsScreen Screen tests", () => {
  it("renders CalleeProfile without crashing", () => {
    const wrapper = shallow(<CallsScreen connected={true} onCall={false} />);
    expect(wrapper.text()).toEqual("<Grid />");
  });
});
