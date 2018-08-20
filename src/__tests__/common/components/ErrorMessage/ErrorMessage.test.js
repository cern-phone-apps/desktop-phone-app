import React from 'react'
import {ErrorMessage} from 'common/components/ErrorMessage/ErrorMessage'

describe('ErrorMessage Component tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ErrorMessage
      errors={[]}
      t={key => key}
    />)
    expect(wrapper.text()).toEqual('')
  })

  it('renders with connection error without crashing', () => {

    const connectionError = {message: 'Connection error message', statusCode: 123}
    const wrapper = shallow(<ErrorMessage
      errors={[connectionError]}
      t={key => key}
    />)
    expect(wrapper.text()).toEqual('<Segment />')
    expect(wrapper.html()).toContain('Connection error message (123)')
  })

})