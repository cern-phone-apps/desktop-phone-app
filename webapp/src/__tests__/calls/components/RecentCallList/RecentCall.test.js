import React from "react";
import RecentCall from "calls/components/recent_calls/RecentCall/RecentCall";

describe("RecentCall component", () => {
  it("renders without crashing", () => {
    const call = {
      author: "author name",
      endTime: 1533029231856 + 6000,
      incoming: false,
      missed: false,
      phoneNumber: "12345",
      startTime: 1533029231856,
      name: "test"
    };

    const wrapper = shallow(<RecentCall recentCall={call} />);

    expect(wrapper.text()).toEqual("<Item />");
    expect(wrapper.debug()).toContain("RecentCallContent");
  });

  it("renders without crashing with incoming true", () => {
    const call = {
      author: "author name",
      endTime: 1533029231856 + 6000,
      incoming: true,
      missed: true,
      phoneNumber: "",
      startTime: 1533029231856,
      name: "test"
    };

    const wrapper = shallow(<RecentCall recentCall={call} />);

    expect(wrapper.text()).toEqual("<Item />");
    expect(wrapper.debug()).toContain("RecentCallContent");
  });
});
