import React from "react";
import CallerTabsSelector from "calls/components/CallerTabsSelector/CallerTabsSelector";

describe("CallerTabsSelector component", () => {
  it("renders without crashing", () => {

    const wrapper = shallow(
      <CallerTabsSelector />
    );

    expect(wrapper.text()).toEqual("<Grid />");
    expect(wrapper.debug()).toContain("search");
    expect(wrapper.debug()).toContain("dialpad");
    expect(wrapper.debug()).toContain("UserSearchForm");
  });
});
