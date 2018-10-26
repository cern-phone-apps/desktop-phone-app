import React from 'react'
import {CallLoader} from 'calls/components/CallLoader/CallLoader'

describe('CalleeProfile Component tests', () => {
  it('renders CalleeProfile without crashing', () => {
    const acceptOutgoingCall = jest.fn()
    const hangUpCurrentCall = jest.fn()
    const wrapper = shallow(<CallLoader
      t={key => key}
      recipientName={'example'}
      acceptOutgoingCall={acceptOutgoingCall}
      calling
      hangupCall={hangUpCurrentCall}
      phoneNumber={'12345'}
     phoneService={{}}/>)
    expect(wrapper.text()).toEqual('<Segment />')
  })
})
