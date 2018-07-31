import React from 'react'
import {StatusDropdown, statuses} from 'calls/components/StatusDropdown/StatusDropdown'

it('renders without crashing', () => {
  const setAvailable = jest.fn()
  const setNotDisturb = jest.fn()
  const setInvisible = jest.fn()
  const disconnect = jest.fn()

  const wrapper = shallow(<StatusDropdown
    status={statuses.available}
    setUserAvailable={setAvailable}
    setUserDoNotDisturb={setNotDisturb}
    setUserInvisible={setInvisible}
    disconnect={disconnect}/>)


  expect(wrapper.text()).toEqual('<Dropdown />')
  expect(wrapper.html()).toContain('StatusSwitcher')
  expect(wrapper.html()).toContain('Disconnect')
  expect(wrapper.html()).toContain('Do not disturb')
  expect(wrapper.html()).toContain('Invisible')
  expect(wrapper.html()).toContain('Available')

})
