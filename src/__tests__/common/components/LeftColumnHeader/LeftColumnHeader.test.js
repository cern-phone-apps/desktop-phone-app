import React from 'react'
import LeftColumnHeader from 'common/components/LeftColumnHeader/LeftColumnHeader'

it('renders without crashing', () => {
  const wrapper = shallow(<LeftColumnHeader />)
  expect(wrapper.text()).toEqual('<Grid />')
  expect(wrapper.debug()).toContain('LeftColumnHeader')
  expect(wrapper.debug()).toContain('header')
})
