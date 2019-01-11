import React from 'react'
import {PersonalInfo} from 'settings/components/PersonalInfo/PersonalInfo'

it('renders without crashing', () => {
  const wrapper = shallow(<PersonalInfo
    t={key => key}
    username={'example'}
    firstName={'firstName'}
    lastName={'lastName'}
    email={'email@cern.ch'}
  />)

  expect(wrapper.text()).toContain('<ErrorBoundary />')
  expect(wrapper.html()).toContain('personalInfo.name')
  expect(wrapper.html()).toContain('firstName lastName')
  expect(wrapper.html()).toContain('personalInfo.username')
  expect(wrapper.html()).toContain('email@cern.ch')
})
