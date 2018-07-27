import React from 'react'
import UserSearch from 'calls/components/UserSearch/UserSearch'

it('renders without crashing', () => {

  const searchUsers = jest.fn()
  const selectUser = jest.fn()
  const unSelectUser = jest.fn()
  const updateSearchValue = jest.fn()

  const wrapper = shallow(<UserSearch
    displayDialpad={false}
    results={[]}
    searchUsers={searchUsers}
    selectUser={selectUser}
    unSelectUser={unSelectUser}
    updateSearchValue={updateSearchValue}
    userSelected={false}/>);
  expect(wrapper.text()).toEqual('<Search />');
  expect(wrapper.html()).toContain('search');
  expect(wrapper.html()).toContain('input');
  expect(wrapper.html()).toContain('results');
  expect(wrapper.html()).toContain('No results found');
})
