import React from 'react'
import UserSearch from 'calls/components/UserSearch/UserSearch'
import {getUsersFormattedForSearch} from 'calls/reducers/search'


describe('UserSearch component', () => {
  it('renders without crashing', () => {
    const searchUsers = jest.fn()
    const selectUser = jest.fn()
    const unSelectUser = jest.fn()
    const updateDialpadValue = jest.fn()

    const wrapper = shallow(<UserSearch
      displayDialpad={false}
      results={[]}
      searchUsers={searchUsers}
      selectUser={selectUser}
      unSelectUser={unSelectUser}
      updateDialpadValue={updateDialpadValue}
      userSelected={false}
      onCall={false}
      calling={false}/>)

    expect(wrapper.text()).toEqual('<UserSearchForm />')
    expect(wrapper.debug()).toContain('UserSearchForm')
  })

  it('handles interaction', () => {
    const searchUsers = jest.fn()
    const selectUser = jest.fn()
    const unSelectUser = jest.fn()
    const updateDialpadValue = jest.fn()

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
      updateDialpadValue={updateDialpadValue}
      userSelected={false}
      onCall={false}
      calling={false}/>)

    const div = wrapper.find('.UserSearch')
    wrapper.setProps({value: 'Test1'});

  })

})