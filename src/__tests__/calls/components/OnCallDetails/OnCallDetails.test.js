import React from "react";
import { HangupButton, OnCallDetails } from "calls/components/OnCallDetails/OnCallDetails";

describe("NotConnectedScreen component", () => {
  it("renders without crashing", () => {
    const hangup = jest.fn();

    const wrapper = shallow(
      <OnCallDetails
        t={key => key}
        phoneService={{}}
        receivingCall={false}
        recipient={{}}
      />
    );

    expect(wrapper.text()).toEqual("<Segment />");
    expect(wrapper.debug()).toContain("onCallWithText");
  });

  it("renders without crashing", () => {
    const hangup = jest.fn();

    const wrapper = shallow(
      <OnCallDetails
        t={key => key}
        phoneService={{ hangUpCurrentCallAction: hangup }}
        receivingCall={false}
        recipient={{}}
      />
    );

    // const div = wrapper.find(".OnCallDetails__HangupButton");
    // div.simulate("click");
    expect(wrapper.text()).toContain("Segment");
  });

  it("renders without crashing", () => {
    const hangup = jest.fn();

    const wrapper = shallow(
      <HangupButton
        onClick={hangup}
      />
    );

    const div = wrapper.find(".OnCallDetails__HangupButton");
    div.simulate("click");
    expect(hangup).toHaveBeenCalled();
  });
});
