import React from "react";
import ConnectNumberButton from "calls/components/ConnectNumberButton/ConnectNumberButton";

describe("ConnectNumberButton Container", () => {
  it("renders without crashing", () => {
    const getUserPhoneNumbers = jest.fn();
    const setActiveNumber = jest.fn();
    const wrapper = shallow(
      <ConnectNumberButton
        connecting={false}
        getUserPhoneNumbers={getUserPhoneNumbers}
        setActiveNumber={setActiveNumber}
        phoneService={{}}
      />
    );

    expect(wrapper.text()).toEqual("<Segment />");
    expect(wrapper.html()).toContain("segment");
    expect(wrapper.html()).toContain("Loading phone numbers...");
  });
});
