import React from 'react'
import LeftColumnHeader from 'common/components/LeftColumnHeader/LeftColumnHeader'

it('renders without crashing', () => {
  const wrapper = shallow(<LeftColumnHeader />)
  expect(wrapper.text()).toEqual('<ColumnHeader />')
  expect(wrapper.debug()).toContain('ToggleButton')
  expect(wrapper.debug()).toContain('Header')
})
