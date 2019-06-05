import React from "react";
import UserPhoneNumberButton from "calls/components/UserPhoneNumberButton/UserPhoneNumberButton";

describe("CalleeProfileNumber Component tests", () => {
  it("renders without crashing", () => {
    const unSelect = jest.fn();
    const wrapper = shallow(
      <UserPhoneNumberButton
        phoneNumber={"12345"}
        unSelectUser={unSelect}
        icon={"phone"}
        callerName={"example name"}
        phoneService={{}}
      />
    );

    expect(wrapper.text()).toEqual("<Button />");
  });

  it("makeCall works", () => {
    const unSelect = jest.fn();
    const makeCall = jest.fn();

    const wrapper = shallow(
      <UserPhoneNumberButton
        phoneNumber={"12345"}
        unSelectUser={unSelect}
        icon={"phone"}
        callerName={"example name"}
        phoneService={{
          makeCall: makeCall
        }}
      />
    );

    expect(wrapper.text()).toEqual("<Button />");

    const div = wrapper.find(".CalleeProfileNumber");
    div.simulate("click");
    expect(makeCall).toHaveBeenCalled();
  });
});
