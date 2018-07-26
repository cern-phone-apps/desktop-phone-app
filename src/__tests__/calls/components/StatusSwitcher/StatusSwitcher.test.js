import React from 'react'
import {StatusSwitcher} from 'calls/components/StatusSwitcher/StatusSwitcher'

it('renders without crashing', () => {
  const wrapper = shallow(<StatusSwitcher
    connected={false}
    disconnecting={false}/>);
  // expect(wrapper.text()).toEqual('<Modal />');
  // expect(wrapper.html()).toEqual('');
})