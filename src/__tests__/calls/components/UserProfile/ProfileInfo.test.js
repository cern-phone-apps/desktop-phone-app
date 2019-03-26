import React from "react";
import { ProfileInfo } from "calls/components/UserProfile/UserProfile";

it("renders ProfileInfo without crashing", () => {
  const profile = {
    division: "division",
    cernGroup: "group",
    cernSection: "section",
    physicalDeliveryOfficeName: "1-1-1",
    mail: "mail@cern.ch",
    displayName: "Name Lastname"
  };

  const wrapper = shallow(<ProfileInfo profile={profile} />);

  expect(wrapper.text()).toEqual("<Segment />");
});
