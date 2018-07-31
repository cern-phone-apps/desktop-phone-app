import React from 'react'
import {ProfileInfo} from 'calls/components/CalleeProfile/CalleeProfile'

it('renders ProfileInfo without crashing', () => {
  const profile = {
    division: 'division',
    cernGroup: 'group',
    cernSection: 'section',
    physicalDeliveryOfficeName: '1-1-1',
    mail: 'mail@cern.ch',
    displayName: 'Name Lastname'
  }

  const wrapper = shallow(<ProfileInfo profile={profile}/>)

  expect(wrapper.text()).toEqual('<Segment />')
  expect(wrapper.html()).toContain('Name Lastname')
  expect(wrapper.html()).toContain('division')
  expect(wrapper.html()).toContain('group')
  expect(wrapper.html()).toContain('section')
  expect(wrapper.html()).toContain('mail@cern.ch')
  expect(wrapper.html()).toContain('1-1-1')
})
