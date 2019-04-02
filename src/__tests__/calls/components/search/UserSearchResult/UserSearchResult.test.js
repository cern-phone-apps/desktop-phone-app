import React from "react";
import UserSearchResult from "calls/components/search/UserSearchResult/UserSearchResult";

describe("UserSearcResult component", () => {

  const selectUser = jest.fn();
  const user = {};

  it("renders without crashing while not searching", () => {
    const wrapper = shallow(
      <UserSearchResult selectUser={selectUser} user={user} />
    );

    expect(wrapper.debug()).toContain("Segment");
    expect(wrapper.debug()).toContain("Header");
    expect(wrapper.debug()).toContain("HeaderContent");
    expect(wrapper.debug()).toContain("searchResult");
  });

  it("renders without crashing while searching", () => {

    const wrapper = shallow(
      <UserSearchResult selectUser={selectUser} user={user} />
    );

    expect(wrapper.debug()).toContain("Segment");
  });

  it("runs the correct function on click", () => {
    const wrapper = shallow(
      <UserSearchResult selectUser={selectUser} user={user} />
    );

    const div = wrapper
      .find("Segment");
    div.simulate("click");

    expect(selectUser).toHaveBeenCalled();
  });
});
