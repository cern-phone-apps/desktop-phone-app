import React from "react";
import { NotConnectedScreen } from "calls/components/NotConnectedScreen/NotConnectedScreen";

describe("NotConnectedScreen component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotConnectedScreen t={key => key} />);

    expect(wrapper.text()).toEqual("<Segment />");
    expect(wrapper.debug()).toContain("basic");
    expect(wrapper.debug()).toContain("center");
  });
});
