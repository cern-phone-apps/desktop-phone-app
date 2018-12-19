import React from "react";
import { UserSearchForm } from "calls/components/UserSearch/UserSearchForm";

describe("UserSearchForm component", () => {
  it("renders without crashing", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    const wrapper = shallow(
      <UserSearchForm onChange={onChange} onSubmit={onSubmit}/>
    );

    expect(wrapper.text()).toEqual("<GridRow /><GridRow />");
    expect(wrapper.debug()).toContain("UserSearchInput");
    expect(wrapper.debug()).toContain("UserSearchResultsList");
  });
});
