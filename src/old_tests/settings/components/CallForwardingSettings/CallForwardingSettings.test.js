import React from "react";
import { CallForwardingSettings } from "settings/components/CallForwardingSettings/CallForwardingSettings";

describe("CallForwardingSettings component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <CallForwardingSettings />
    );

    expect(wrapper.text()).toEqual("<ErrorBoundary />");
    expect(wrapper.debug()).toContain("Call Forwarding");
  })
});