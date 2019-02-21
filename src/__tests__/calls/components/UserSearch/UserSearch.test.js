import React from "react";
import { UserSearchForm } from "calls/components/UserSearch/UserSearchForm";
import { UserSearch } from "calls/components/UserSearch/UserSearch";
import PropTypes from "prop-types";

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

  it("runs the correct function on click", () => {

    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const searchUsers = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();
    const clearSearchResults = jest.fn();

    const wrapper = shallow(
      <UserSearch
        results={['1', '2', '3']}
        displayDialpad={true}
        onCall={false}
        calling={false}
        userSelected={true}
        dialpadValue={'1'}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        searchUsers={searchUsers}
        updateDialpadValue={updateDialpadValue}
        toggleDialpad={toggleDialpad}
        clearSearchResults={clearSearchResults}
      />
    );

    const div = wrapper.find("MenuItem").first();
    div.simulate('click', { "name": 'search' });
    expect(wrapper.state().activeItem).toBe('search');
  });

  it("runs the correct function on dialpad change", () => {

    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const searchUsers = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();
    const clearSearchResults = jest.fn();

    const wrapper = shallow(
      <UserSearch
        results={['1', '2', '3']}
        displayDialpad={true}
        onCall={false}
        calling={false}
        userSelected={true}
        dialpadValue={'1'}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        searchUsers={searchUsers}
        updateDialpadValue={updateDialpadValue}
        toggleDialpad={toggleDialpad}
        clearSearchResults={clearSearchResults}
      />
    );

    const div = wrapper.find("MenuItem").last();
    div.simulate('click', { "name": 'dialpad' });

    // const div = wrapper.find("MenuItem").first();
    // div.simulate('click', { "name": 'search' });
    wrapper.find('CallerDialpadForm').simulate('change', {
      target: { value: '1' }
    });
    expect(updateDialpadValue).toHaveBeenCalled();
  });

  it("runs the correct function on user search form change", done  => {

    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const searchUsers = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();
    const clearSearchResults = jest.fn();

    const wrapper = shallow(
      <UserSearch
        results={['1', '2', '3']}
        displayDialpad={true}
        onCall={false}
        calling={false}
        userSelected={true}
        dialpadValue={'1'}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        searchUsers={searchUsers}
        updateDialpadValue={updateDialpadValue}
        toggleDialpad={toggleDialpad}
        clearSearchResults={clearSearchResults}
      />
    );

    wrapper.find('UserSearchForm').simulate('change', {
      name: 'search',
      value: 'test'
    });
    setTimeout(()=>{
      expect(wrapper.state('search')).toEqual('test');
      done();
    }, 350);

  });

  it("runs the correct function on user search form change when there is timeout", done  => {

    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const searchUsers = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();
    const clearSearchResults = jest.fn();

    const wrapper = shallow(
      <UserSearch
        results={['1', '2', '3']}
        displayDialpad={true}
        onCall={false}
        calling={false}
        userSelected={true}
        dialpadValue={'1'}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        searchUsers={searchUsers}
        updateDialpadValue={updateDialpadValue}
        toggleDialpad={toggleDialpad}
        clearSearchResults={clearSearchResults}
      />
    );

    wrapper.find('UserSearchForm').simulate('change', {
      name: 'search',
      value: 'test'
    });
    setTimeout(()=>{
      wrapper.find('UserSearchForm').simulate('change', {
        name: 'search',
        value: 'test'
      });
      expect(wrapper.state('timeout')).toBeGreaterThan(1);
      done();
    }, 350);

  });

  it("runs the correct function on user search form submit", done  => {

    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const searchUsers = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();
    const clearSearchResults = jest.fn();

    const wrapper = shallow(
      <UserSearch
        results={['1', '2', '3']}
        displayDialpad={true}
        onCall={false}
        calling={false}
        userSelected={true}
        dialpadValue={'1'}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        searchUsers={searchUsers}
        updateDialpadValue={updateDialpadValue}
        toggleDialpad={toggleDialpad}
        clearSearchResults={clearSearchResults}
      />
    );

    searchUsers.mockImplementation(() => Promise.resolve({ results: [] }));


    wrapper.setState({ searchValue: 'test' }, () => {

      wrapper.update();

      wrapper.find('UserSearchForm').simulate('submit');

      setTimeout(()=>{
        expect(searchUsers).toHaveBeenCalled();
        done();
      }, 350);
    });

  });

  it("runs the correct function on user search form submit", done  => {

    const selectUser = jest.fn();
    const unSelectUser = jest.fn();
    const searchUsers = jest.fn();
    const updateDialpadValue = jest.fn();
    const toggleDialpad = jest.fn();
    const clearSearchResults = jest.fn();

    const wrapper = shallow(
      <UserSearch
        results={['1', '2', '3']}
        displayDialpad={true}
        onCall={false}
        calling={false}
        userSelected={true}
        dialpadValue={'1'}
        selectUser={selectUser}
        unSelectUser={unSelectUser}
        searchUsers={searchUsers}
        updateDialpadValue={updateDialpadValue}
        toggleDialpad={toggleDialpad}
        clearSearchResults={clearSearchResults}
      />
    );

    searchUsers.mockImplementation(() => Promise.resolve({ results: [] }));

    // wrapper.setState({ searchValue: 'test'});

    wrapper.find('UserSearchForm').simulate('change', {
      name: 'searchValue',
      value: 'test'
    });
    setTimeout(()=>{
      wrapper.find('UserSearchForm').simulate('change', {
        name: 'searchValue',
        value: 'test'
      });
      expect(clearSearchResults).toHaveBeenCalled();
      done();
    }, 350);

  });

});
