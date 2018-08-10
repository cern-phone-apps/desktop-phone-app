import React from 'react'
import {OnCallMessage} from 'calls/components/OnCallMessage/OnCallMessage'

describe('OnCallMessage component', () => {
  it('renders without crashing', () => {

    const wrapper = shallow(<OnCallMessage
      t={key => key}
      recipient={{}}/>)

    expect(wrapper.text()).toEqual('<Link />')
    expect(wrapper.debug()).toContain('onCallWithText')
    expect(wrapper.debug()).toContain('OnCallMessage')
    expect(wrapper.debug()).toContain('startTime')
  })
})