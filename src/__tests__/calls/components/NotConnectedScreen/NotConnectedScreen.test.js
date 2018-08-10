import React from 'react'
import {NotConnectedScreen} from 'calls/components/NotConnectedScreen/NotConnectedScreen'

describe('NotConnectedScreen component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotConnectedScreen
      t={key=>key}/>)

    expect(wrapper.text()).toEqual('disconnected.header<Segment />')
    expect(wrapper.debug()).toContain('disconnected.header')
    expect(wrapper.debug()).toContain('disconnected.text')
  })
})