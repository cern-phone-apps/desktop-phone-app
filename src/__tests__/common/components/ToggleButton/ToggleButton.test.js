import React from 'react'
import ToggleButton from 'common/components/ToggleButton/ToggleButton'

it('renders without crashing', () => {
  const displaySidebar = jest.fn()
  const finishedDisplaySidebar = jest.fn()
  const wrapper = shallow(<ToggleButton
    displaySidebar={displaySidebar}
    finishedDisplayingSidebar={finishedDisplaySidebar}
    displayTime={500}/>)

  expect(wrapper.text()).toEqual('<Button />')
  expect(wrapper.html()).toContain('button')
  expect(wrapper.html()).toContain('sidebar')
})
