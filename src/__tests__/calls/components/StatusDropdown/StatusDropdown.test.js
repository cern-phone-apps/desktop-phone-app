import React from 'react'
import StatusDropdown, {statuses} from 'calls/components/StatusDropdown/StatusDropdown'

it('renders without crashing', () => {

  const setAvailable = jest.fn()
  const setNotDisturb = jest.fn()
  const setInvisible = jest.fn()

  const icon = shallow(<StatusDropdown
  status={statuses.available}
  setUserAvailable={setAvailable}
  setUserDoNotDisturb={setNotDisturb}
  setUserInvisible={setInvisible}/>);

  expect(icon.text()).toEqual('<Dropdown />');
  expect(icon.html()).toContain('StatusSwitcher');
  expect(icon.html()).toContain('Disconnect');
  expect(icon.html()).toContain('Do not disturb');
  expect(icon.html()).toContain('Invisible');
  expect(icon.html()).toContain('Available');
})