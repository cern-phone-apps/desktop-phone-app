import React from 'react'
import {DeviceField} from 'settings/components/DeviceSettings/DeviceField'


it('renders without crashing', () => {
  const wrapper = shallow(<DeviceField fieldLabel={'audioInput'} fieldId={'audioInput2'} />)

  expect(wrapper.text()).toBe('<FormField />')
  expect(wrapper.unmount()).toHaveLength(1)
})