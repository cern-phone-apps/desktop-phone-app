import React from "react";
import {UserProfile} from "calls/components/UserProfile/UserProfile";

describe("CalleeProfile Component tests", () => {
  it("renders CalleeProfile without crashing", () => {
    const unSelectUser = jest.fn();
    const getProfile = jest.fn();
    const wrapper = shallow(
      <UserProfile
        t={key => key}
        fetching={false}
        getUserProfile={getProfile}
        username={"example"}
        profile={{ phones: [] }}
        recipientName={"test name"}
        unSelectUser={unSelectUser}
      />
    );
    expect(wrapper.text()).toEqual("<Segment />");
  });
});
