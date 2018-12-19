import React from "react";
import UserSearch from "calls/components/UserSearch/UserSearch";

describe("UserSearch component", () => {
  it("renders without crashing", () => {
    const searchUsers = jest.fn();
    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();

    const wrapper = shallow(
      <UserSearch
        displayDialpad={false}
        results={[]}
        searchUsers={searchUsers}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        updateDialpadValue={updateDialpadValue}
        userSelected={false}
        onCall={false}
        calling={false}
        toggleDialpad={toggleDialpad}/>
    );

    expect(wrapper.text()).toEqual("<Grid />");
    expect(wrapper.debug()).toContain("GridRow");
    expect(wrapper.debug()).toContain("Form");
    expect(wrapper.debug()).toContain("UserSearchForm");
  });
});