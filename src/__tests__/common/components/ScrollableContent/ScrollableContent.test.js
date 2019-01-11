import React from 'react'
import ScrollableContent from 'common/components/ScrollableContent/ScrollableContent'

it('renders without crashing', () => {
  const wrapper = shallow(<ScrollableContent />)

  expect(wrapper.text()).toEqual('')
  expect(wrapper.html()).toContain('ScrollableContent')
  expect(wrapper.html()).toContain('div')
})
