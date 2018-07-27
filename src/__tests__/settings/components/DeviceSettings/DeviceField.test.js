import React from 'react'
import {DeviceField} from 'settings/components/DeviceSettings/DeviceField'


it('renders without crashing', () => {
  const wrapper = shallow(<DeviceField />)

  expect(wrapper.text()).toBe('')
  expect(wrapper.unmount()).toHaveLength(1)
})