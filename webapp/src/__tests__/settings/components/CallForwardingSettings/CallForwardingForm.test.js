import React from "react";
import { CallForwardingForm } from "settings/components/CallForwardingSettings/CallForwardingForm/CallForwardingForm";

describe("CallForwardingSettings component", () => {
  it("renders without crashing", () => {
    const addLocalNumber = jest.fn();
    const getStatus = jest.fn();

    const wrapper = shallow(
      <CallForwardingForm
        addLocalForwardNumber={addLocalNumber}
        fetchingStatus={false}
        localForwardList={[]}
        status={{}}
        getCallForwardingStatus={getStatus}
      />
    );

    expect(wrapper.text()).toEqual("<Form />");
    expect(wrapper.debug()).toContain("Disable Call Forwarding");
    expect(wrapper.debug()).toContain("Forward to");
    expect(wrapper.debug()).toContain("Simultaneous ringing");
  });

  it("renders without crashing", async () => {
    const addLocalNumber = jest.fn();
    // const getStatus = jest.fn();

    const status = {
      "destination-list": ["123456"],
      "simultaneous-ring": false,
      "call-forwarding": true,
      success: true
    };

    const statusResult = {
      payload: {
        result: status
      }
    };

    const getStatus = jest.fn(() => {
      return statusResult;
    });

    const wrapper = shallow(
      <CallForwardingForm
        addLocalForwardNumber={addLocalNumber}
        fetchingStatus={false}
        localForwardList={[]}
        status={status}
        getCallForwardingStatus={getStatus}
      />
    );

    wrapper.state().localForwardList = [];
    expect(wrapper.instance().getRadioButtonValue()).toEqual("disabled");
    await wrapper.instance().fetchData();
    expect(getStatus).toHaveBeenCalled();

    expect(wrapper.state()).toEqual({
      defaultDropdownValues: ["123456"],
      fetchTimes: 0,
      forwardList: [{ text: "123456", value: "123456" }],
      forwardStatus: "forward",
      isFetching: false,
      localForwardList: [],
      remoteList: [{ text: "123456", value: "123456" }]
    });

    wrapper.instance().selectDefaultDropdownSelection();
    expect(wrapper.state()).toEqual({
      defaultDropdownValues: ["123456"],
      fetchTimes: 0,
      forwardList: [{ text: "123456", value: "123456" }],
      forwardStatus: "forward",
      isFetching: false,
      localForwardList: [],
      remoteList: [{ text: "123456", value: "123456" }]
    });

  });
});
