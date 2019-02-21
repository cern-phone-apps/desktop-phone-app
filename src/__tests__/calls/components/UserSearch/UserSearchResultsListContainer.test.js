import React from "react";
import { shallow } from "enzyme";
import configureMockStore from 'redux-mock-store';
import UserSearchContainer from "calls/components/UserSearch/UserSearchResultsListContainer";
const mockStore = configureMockStore();


describe('UserSearchResultsList', () => {
  let wrapper, store;

  let resultsArray = ['1', '2', '3'];

  beforeEach(() => {
    const initialState = {
      calls: {
        search: {
          userSelected: 'asd',
          searchResults: resultsArray,
          searching: false,
        }
      }
    };
    store = mockStore(initialState);

    wrapper = shallow(
      <UserSearchContainer
        store={store}
      />
    );

  });

  it('should show the correct props', () => {
    expect(wrapper.props().searching).toBe(false);
  });

});
