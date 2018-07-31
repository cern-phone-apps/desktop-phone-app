import React from 'react'
import MakeCallButton from 'calls/components/MakeCallButton/MakeCallButton'

describe('MakeCallButton component', () => {
  it('renders without crashing', () => {
    const makeCall = jest.fn()
    const wrapper = shallow(<MakeCallButton author={'author name'} calling={false} connected={true} makeCall={makeCall} onCall={false} phoneNumber={'12345'}/>)

    expect(wrapper.text()).toEqual('<Button />')
    expect(wrapper.debug()).toContain('Button')
    expect(wrapper.debug()).toContain('phone')
    expect(wrapper.debug()).toContain('icon')
  })
})
