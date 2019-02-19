import React from "react";
import RecentCall from "calls/components/RecentCallList/RecentCall";

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
    expect(wrapper.debug()).toContain("ItemContent");
    expect(wrapper.debug()).toContain("ItemDescription");
    expect(wrapper.debug()).toContain("Icon");
    expect(wrapper.debug()).toContain("a few seconds");
    expect(wrapper.debug()).toContain("12345");
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
    expect(wrapper.debug()).toContain("ItemContent");
    expect(wrapper.debug()).toContain("ItemDescription");
    expect(wrapper.debug()).toContain("Icon");
    expect(wrapper.debug()).toContain("a few seconds");
  });
});
