import React from "react";
import { OnCallScreen } from "calls/screens/CallsScreen/OnCallScreen/OnCallScreen";

describe("OnCallScreen Screen tests", () => {
  it("renders OnCallScreen without crashing", () => {
    const wrapper = shallow(<OnCallScreen />);
    expect(wrapper.text()).toEqual("<GridColumn />");
  });
});
