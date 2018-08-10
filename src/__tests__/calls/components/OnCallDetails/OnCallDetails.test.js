import React from 'react'
import {OnCallDetails} from 'calls/components/OnCallDetails/OnCallDetails'

describe('NotConnectedScreen component', () => {
  it('renders without crashing', () => {

    const hangup = jest.fn()

    const wrapper = shallow(<OnCallDetails
      t={key => key}
      phoneService={{}}
      receivingCall={false}
      recipient={{}}/>)

    expect(wrapper.text()).toEqual('onCallWithText<Icon /> <Timer />')
    expect(wrapper.debug()).toContain('onCallWithText')
  })

  it('renders without crashing', () => {

    const hangup = jest.fn()

    const wrapper = shallow(<OnCallDetails
      t={key => key}
      phoneService={{hangUpCall: hangup}}
      receivingCall={false}
      recipient={{}}/>)

    const div = wrapper.find('.OnCallDetails__HangupButton')
    div.simulate('click')
    expect(hangup).toHaveBeenCalled()
  })
})