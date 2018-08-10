import React from 'react'
import MakeCallButton from 'calls/components/MakeCallButton/MakeCallButton'

describe('MakeCallButton component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<MakeCallButton
      calling={false}
      connected={true}
      onCall={false}
      phoneService={{}}
      recipient={{}}/>)

    expect(wrapper.text()).toEqual('<Button />')
    expect(wrapper.debug()).toContain('Button')
    expect(wrapper.debug()).toContain('phone')
    expect(wrapper.debug()).toContain('icon')
  })

  it('simulates click without crashing', () => {
    const makeCall = jest.fn()
    const wrapper = shallow(<MakeCallButton
      calling={false}
      connected={true}
      onCall={false}
      phoneService={{
        makeCall: makeCall
      }}
      recipient={{}}/>)

    const div = wrapper.find('.MakeCallButton')
    div.simulate('click')
    expect(makeCall).toHaveBeenCalled()
  })

})
