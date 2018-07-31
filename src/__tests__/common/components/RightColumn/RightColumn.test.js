import React from 'react'
import RightColumn from 'common/components/RightColumn/RightColumn'

it('renders without crashing', () => {
  const wrapper = shallow(<RightColumn />)

  expect(wrapper.text()).toEqual('')
  expect(wrapper.html()).toContain('RightColumn')
  expect(wrapper.html()).toContain('div')
})
