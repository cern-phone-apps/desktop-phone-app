import React from "react";
import { NotConnectedScreen } from "calls/screens/CallsScreen/NotConnectedScreen/NotConnectedScreen";

describe("NotConnectedScreen component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotConnectedScreen t={key => key} />);

    expect(wrapper.text()).toEqual("<GridColumn />");
    expect(wrapper.debug()).toContain("basic");
    expect(wrapper.debug()).toContain("center");
  });
});
