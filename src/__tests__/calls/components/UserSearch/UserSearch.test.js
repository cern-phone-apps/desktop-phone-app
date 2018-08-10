import React from 'react'
import UserSearch from 'calls/components/UserSearch/UserSearch'
import {getUsersFormattedForSearch} from 'calls/reducers/search'


describe('UserSearch component', () => {
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
      userSelected={false}/>)
    expect(wrapper.text()).toEqual('<Search />')
    expect(wrapper.html()).toContain('search')
    expect(wrapper.html()).toContain('input')
    expect(wrapper.html()).toContain('results')
    expect(wrapper.html()).toContain('No results found')
  })

  it('mounts without crashing', () => {
    const searchUsers = jest.fn()
    const selectUser = jest.fn()
    const unSelectUser = jest.fn()
    const updateSearchValue = jest.fn()

    const wrapper = mount(<UserSearch
      displayDialpad={false}
      results={[]}
      searchUsers={searchUsers}
      selectUser={selectUser}
      unSelectUser={unSelectUser}
      updateSearchValue={updateSearchValue}
      userSelected={false}/>)

    expect(wrapper.text()).toEqual('No results found.')
    expect(wrapper.html()).toContain('search')
    expect(wrapper.html()).toContain('input')
    expect(wrapper.html()).toContain('results')
    expect(wrapper.html()).toContain('No results found')
  })

  it('handles interaction', () => {
    const searchUsers = jest.fn()
    const selectUser = jest.fn()
    const unSelectUser = jest.fn()
    const updateSearchValue = jest.fn()

    const results = [
      {
        displayName: "Test 1",
        phones: [{
          number: '88001',
          phoneType: 'phone'
        }],
        mail: "test1@cern.ch",
        cernSection: "TEST_SEC",
        cernGroup: "TEST_GROUP",
        division: "TEST_DIVISION",
        physicalDeliveryOfficeName: "No office",
        username: "test80001",
        personId: "test80001"
      }]
    const formatedResults = getUsersFormattedForSearch(results)

    const wrapper = shallow(<UserSearch
      displayDialpad={false}
      results={formatedResults}
      searchUsers={searchUsers}
      selectUser={selectUser}
      unSelectUser={unSelectUser}
      updateSearchValue={updateSearchValue}
      userSelected={false}/>)

    const div = wrapper.find('.UserSearch')
    // div.simulate('change', {target: {value: 'Test1'}});
    // div.simulate('keydown', { which: 'Test1' })
    wrapper.setProps({ value: 'Test1' });

    wrapper.instance().handleSearchChange({target: {value: 'Test2'}}, formatedResults[0])
    expect(updateSearchValue).toHaveBeenCalled()
    expect(wrapper.state().isLoading).toBe(true)

    wrapper.setProps({ value: undefined });
    wrapper.instance()._handleSearchTimeout('Test2')
    expect(unSelectUser).toHaveBeenCalled()

    wrapper.instance().handleResultSelect({}, {result: formatedResults[0]})
    expect(selectUser).toHaveBeenCalled()


  })

})