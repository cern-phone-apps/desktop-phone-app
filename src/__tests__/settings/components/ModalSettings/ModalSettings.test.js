import React from 'react'
import {ModalSettings} from 'settings/components/ModalSettings/ModalSettings'

it('renders without crashing', () => {
  const hideSidebarIfVisible = jest.fn()
  const logout = jest.fn()
  const wrapper = shallow(<ModalSettings
    t={key => key}
    hideSidebarIfVisible={hideSidebarIfVisible}
    logout={logout}/>)

  expect(wrapper.text()).toContain('<Modal />')
  expect(wrapper.html()).toContain('<a class="item">')
  expect(wrapper.html()).toContain('Settings')
})
