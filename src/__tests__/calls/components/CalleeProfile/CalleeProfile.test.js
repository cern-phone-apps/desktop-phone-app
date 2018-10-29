import React from "react";
import { CalleeProfile } from "calls/components/CalleeProfile/CalleeProfile";

describe("CalleeProfile Component tests", () => {
  it("renders CalleeProfile without crashing", () => {
    const unSelectUser = jest.fn();
    const getProfile = jest.fn();
    const wrapper = shallow(
      <CalleeProfile
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
