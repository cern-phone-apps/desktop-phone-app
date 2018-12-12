import React from "react";
import NumberConnector from "calls/components/NumberConnector/NumberConnector";

describe("NumberConnector Container", () => {
  it("renders without crashing", () => {
    const getUserPhoneNumbers = jest.fn();
    const setActiveNumber = jest.fn();
    const wrapper = shallow(
      <NumberConnector
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

  it("renders ButtonNumberList", () => {
    const getUserPhoneNumbers = jest.fn();
    const setActiveNumber = jest.fn();

    const phoneService = {
      authenticateUser: jest.fn()
    };

    const wrapper = shallow(
      <NumberConnector
        connecting={false}
        numbers={['1', '2', '3']}
        getUserPhoneNumbers={getUserPhoneNumbers}
        setActiveNumber={setActiveNumber}
        phoneService={phoneService}
      />
    );

    expect(wrapper.text()).toEqual("<ButtonNumbersList />");
    expect(wrapper.html()).toContain("ConnectNumberButton");
    expect(wrapper.html()).toContain("plug");
    expect(wrapper.html()).toContain("icon");
  });

  it("renders connecting text", () => {
    const getUserPhoneNumbers = jest.fn();
    const setActiveNumber = jest.fn();

    const phoneService = {
      authenticateUser: jest.fn()
    };

    const wrapper = shallow(
      <NumberConnector
        connecting={true}
        getUserPhoneNumbers={getUserPhoneNumbers}
        setActiveNumber={setActiveNumber}
        phoneService={phoneService}
      />
    );

    expect(wrapper.text()).toEqual("<Segment />");
    expect(wrapper.html()).toContain("Connecting...");
  });
});
