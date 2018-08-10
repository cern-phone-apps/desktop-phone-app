import React from 'react'
import {CallErrorMessage} from 'calls/components/CallErrorMessage/CallErrorMessage'

describe('CallErrorMessage Component tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CallErrorMessage
      t={key => key}
    />)
    expect(wrapper.text()).toEqual('')
  })

  it('renders with connection error without crashing', () => {

    const connectionError = {message: 'Connection error message', statusCode: 123}
    const wrapper = shallow(<CallErrorMessage
      connectionError={connectionError}
      t={key => key}
    />)
    expect(wrapper.text()).toEqual('<Segment />')
    expect(wrapper.html()).toContain('Connection error message (123)')
  })

  it('renders with numbers error without crashing', () => {

    const connectionError = {message: 'Numbers error message', statusCode: 123}
    const wrapper = shallow(<CallErrorMessage
      numbersError={connectionError}
      t={key => key}
    />)
    expect(wrapper.text()).toEqual('<Segment />')
    expect(wrapper.html()).toContain('Numbers error message (123)')
  })

  it('renders with call error without crashing', () => {

    const connectionError = {message: 'Call error message', statusCode: 123}
    const wrapper = shallow(<CallErrorMessage
      callError={connectionError}
      t={key => key}
    />)
    expect(wrapper.text()).toEqual('<Segment />')
    expect(wrapper.html()).toContain('Call error message (123)')
  })
})