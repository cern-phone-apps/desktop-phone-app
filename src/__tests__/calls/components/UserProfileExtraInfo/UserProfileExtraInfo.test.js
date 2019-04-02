import React from "react";
import { UserProfileExtraInfo } from "calls/components/UserProfileExtraInfo/UserProfileExtraInfo";

it("renders ProfileInfo without crashing", () => {
  const profile = {
    physicalDeliveryOfficeName: "1-1-1",
    mail: "mail@cern.ch"
  };

  const wrapper = shallow(<UserProfileExtraInfo profile={profile} />);

  expect(wrapper.text()).toEqual("<Icon /> <Icon /> ");
});
