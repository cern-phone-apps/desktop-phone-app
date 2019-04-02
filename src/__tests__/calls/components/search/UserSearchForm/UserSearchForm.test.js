import React from "react";
import { UserSearchForm } from "calls/components/search/UserSearchForm/UserSearchForm";

describe("UserSearch component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<UserSearchForm />);

    expect(wrapper.text()).toEqual("<SearchFieldRow /><SearchResultsRow /><Connect(SearchProfileModal) />");
    expect(wrapper.debug()).toContain("SearchFieldRow");
    expect(wrapper.debug()).toContain("SearchResultsRow");
    expect(wrapper.debug()).toContain("SearchProfileModal");
  });

//   it("runs the correct function on user search form submit", done => {
//     const searchUsers = jest.fn();
//     const wrapper = shallow(<UserSearchForm />);
//
//     searchUsers.mockImplementation(() =>
//       Promise.resolve({ payload: { results: [] } })
//     );
//
//     wrapper.setState({ searchValue: "test" }, () => {
//       wrapper.update();
//       expect(wrapper).toBe("");
//       wrapper.find("SearchFieldRow").simulate("submit");
//
//       setTimeout(() => {
//         expect(searchUsers).toHaveBeenCalled();
//         done();
//       }, 350);
//     });
//   });
});
