import React from 'react'
import {CallLoader} from 'calls/components/CallLoader/CallLoader'

describe('CalleeProfile Component tests', () => {
  it('renders CalleeProfile without crashing', () => {
    const acceptCall = jest.fn()
    const hangUpCall = jest.fn()
    const wrapper = shallow(<CallLoader
      t={key => key}
      recipientName={'example'}
      acceptCall={acceptCall}
      calling
      hangupCall={hangUpCall}
      phoneNumber={'12345'}
     phoneService={{}}/>)
    expect(wrapper.text()).toEqual('<PhoneRingingIcon />callingText  example(12345)')
  })
})
