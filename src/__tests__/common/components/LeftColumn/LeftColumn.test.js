import React from 'react'
import LeftColumn from 'common/components/LeftColumn/LeftColumn'


it('renders without crashing', () => {
  const wrapper = shallow(<LeftColumn />)

  expect(wrapper.text()).toEqual('')
  expect(wrapper.html()).toContain('LeftColumn')
  expect(wrapper.html()).toContain('div')
})
