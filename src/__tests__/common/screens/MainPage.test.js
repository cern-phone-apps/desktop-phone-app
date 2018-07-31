import React from 'react'
import {MainPage} from 'common/screens/MainPage/MainPage'

it('renders without crashing', () => {
  const hideSidebar = jest.fn()
  const loader = shallow(<MainPage t={key => key} contentDimmed hideSidebar={hideSidebar} isAuthenticated isVisible/>)

  expect(loader.text()).toEqual('<SidebarPushable />')
  expect(loader.debug()).toContain('MenuItem')
  expect(loader.debug()).toContain('SidebarPusher')
})
