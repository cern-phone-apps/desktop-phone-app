import React from "react";
import UserPhoneNumber from "calls/components/UserProfile/UserPhoneNumber";

describe("CalleeProfileNumber Component tests", () => {
  it("renders without crashing", () => {
    const unSelect = jest.fn();
    const wrapper = shallow(
      <UserPhoneNumber
        phoneNumber={"12345"}
        unSelectUser={unSelect}
        icon={"phone"}
        recipientName={"example name"}
        phoneService={{}}
      />
    );

    expect(wrapper.text()).toEqual("<Button />");
  });

  it("makeCall works", () => {
    const unSelect = jest.fn();
    const makeCall = jest.fn();

    const wrapper = shallow(
      <UserPhoneNumber
        phoneNumber={"12345"}
        unSelectUser={unSelect}
        icon={"phone"}
        recipientName={"example name"}
        phoneService={{
          makeCall: makeCall
        }}
      />
    );

    expect(wrapper.text()).toEqual("<Button />");

    const div = wrapper.find(".CalleeProfileNumber");
    div.simulate("click");
    expect(makeCall).toHaveBeenCalled();
    expect(unSelect).toHaveBeenCalled();
  });
});
