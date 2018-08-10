import React from 'react'
import {StatusSwitcher} from 'calls/components/StatusSwitcher/StatusSwitcher'

describe('StatusSwitcher component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<StatusSwitcher
      connected={false}
      disconnecting={false} phoneService={{}}/>)
    expect(wrapper.text()).toEqual('<Button />');
    expect(wrapper.debug()).toContain('ToggleButtonContainer');
    expect(wrapper.debug()).toContain('Icon');
    expect(wrapper.debug()).toContain('Link');
  })

  it('can trigger disconnect without crashing', () => {

    const unauth = jest.fn()
    const wrapper = shallow(<StatusSwitcher
      connected={true}
      disconnecting={false}
      phoneService={{
        unAuthenticateUser: unauth
      }}/>)

    wrapper.instance().disconnect()
    expect(unauth).toHaveBeenCalled()
  })
})
