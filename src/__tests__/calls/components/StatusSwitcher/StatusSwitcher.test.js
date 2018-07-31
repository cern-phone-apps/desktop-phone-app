import React from 'react'
import {StatusSwitcher} from 'calls/components/StatusSwitcher/StatusSwitcher'

it('renders without crashing', () => {
  const wrapper = shallow(<StatusSwitcher
    connected={false}
    disconnecting={false} phoneService={{}}/>)
  // expect(wrapper.text()).toEqual('<Button />');
  // expect(wrapper.html()).toEqual('');
})
