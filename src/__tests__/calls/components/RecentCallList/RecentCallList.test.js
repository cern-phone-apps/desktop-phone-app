import React from "react";
import RecentCallList from "calls/components/recent_calls/RecentCallList/RecentCallList";

describe("RecentCallList component", () => {
  it("renders  empty list without crashing", () => {
    const wrapper = shallow(<RecentCallList recentCalls={[]} />);

    expect(wrapper.text()).toEqual("<ScrollableContent />");
    expect(wrapper.debug()).toContain("ItemGroup");
  });

  it("renders list without crashing", () => {
    const recent = [
      {
        author: "author name",
        endTime: 1533029231856 + 6000,
        incoming: false,
        missed: false,
        phoneNumber: "12345",
        startTime: 1533029231856,
        name: "test"
      }
    ];

    const wrapper = shallow(<RecentCallList recentCalls={recent} />);

    expect(wrapper.text()).toEqual("<ScrollableContent />");
    expect(wrapper.debug()).toContain("ItemGroup");
  });
});
