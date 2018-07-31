import React from 'react'
import {CalleeProfileNumber} from 'calls/components/CalleeProfile/CalleeProfileNumber'

it('renders CalleeProfileNumber without crashing', () => {
  const makeCall = jest.fn()
  const acceptCall = jest.fn()
  const unSelect = jest.fn()
  const wrapper = shallow(<CalleeProfileNumber
    acceptCall={acceptCall}
    calling={false}
    makeCall={makeCall}
    phoneNumber={'12345'}
    unSelectUser={unSelect}
    icon={'phone'}
    recipientName={'example name'}/>)

  expect(wrapper.text()).toEqual('<MenuItem />')
})
