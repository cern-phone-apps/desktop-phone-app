import React from 'react'
import DisconnectModal from 'calls/components/StatusSwitcher/DisconnectModal'

it('renders without crashing', () => {
  const wrapper = shallow(<DisconnectModal/>);
  expect(wrapper.text()).toEqual('<Modal />');
  expect(wrapper.html()).toEqual('');
})