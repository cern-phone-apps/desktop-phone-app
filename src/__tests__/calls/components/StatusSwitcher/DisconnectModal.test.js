import React from 'react'
import DisconnectModal from 'calls/components/StatusSwitcher/DisconnectModal'

describe('DisconnectModal component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DisconnectModal disconnecting={true}/>)
    expect(wrapper.text()).toEqual('<Modal />')
    expect(wrapper.debug()).toContain('Modal')
    expect(wrapper.debug()).toContain('ModalContent')
    expect(wrapper.debug()).toContain('Loader')
  })
})
