import React from "react";
import { OnCallBanner } from "calls/components/OnCallBanner/OnCallBanner";

describe("OnCallMessage component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OnCallBanner t={key => key} caller={{}} />);

    expect(wrapper.text()).toEqual("<Link />");
    expect(wrapper.debug()).toContain("onCallWithText");
    expect(wrapper.debug()).toContain("OnCallMessage");
    expect(wrapper.debug()).toContain("startTime");
  });
});
