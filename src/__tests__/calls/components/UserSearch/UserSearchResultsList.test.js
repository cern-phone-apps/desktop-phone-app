import React from "react";
import { UserSearchResultsList } from "calls/components/UserSearch/UserSearchResultsList";

describe("UserSearchForm component", () => {

  it("renders without crashing while not searching", () => {
    const selectUser = jest.fn();
    const getUserProfile = jest.fn();

    const wrapper = shallow(
      <UserSearchResultsList
        results={['1', '2', '3']}
        searching={false}
        selectUser={selectUser}
        getUserProfile={getUserProfile}
      />
    );

    expect(wrapper.debug()).toContain("UserSearchResult");
  });

  it("renders without crashing while searching", () => {
    const selectUser = jest.fn();
    const getUserProfile = jest.fn();

    const wrapper = shallow(
      <UserSearchResultsList
        results={['1', '2', '3']}
        searching={true}
        selectUser={selectUser}
        getUserProfile={getUserProfile}
      />
    );

    expect(wrapper.debug()).toContain("Segment");
  });

  it("runs the correct function on click", () => {
    const selectUser = jest.fn();
    const getUserProfile = jest.fn();

    const wrapper = shallow(
      <UserSearchResultsList
        results={['1', '2', '3']}
        searching={false}
        selectUser={selectUser}
        getUserProfile={getUserProfile}
      />
    );

    const div = wrapper.find("UserSearchResult").first();
    div.simulate('click');

    expect(selectUser).toHaveBeenCalled();

  });

  it("runs the correct function on click", () => {
    const selectUser = jest.fn();
    const getUserProfile = jest.fn();

    const wrapper = shallow(
      <UserSearchResultsList
        results={['1', '2', '3']}
        searching={false}
        selectUser={selectUser}
        getUserProfile={getUserProfile}
      />
    );


    const div = wrapper.find("UserSearchResult").first().dive();
    div.simulate('click');

    expect(selectUser).toHaveBeenCalled();

  });

});
