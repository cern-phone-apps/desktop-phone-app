import React from 'react'
import ConnectNumberButton from 'calls/components/ConnectNumberButton/ConnectNumberButton'

describe('ConnectNumberButton Container', () => {
  it('renders without crashing', () => {

    const getUserPhoneNumbers = jest.fn()
    const setActiveNumber = jest.fn()
    const wrapper = shallow(<ConnectNumberButton
      connecting={false}
      getUserPhoneNumbers={getUserPhoneNumbers}
      numbers={['1', '2', '3']}
      setActiveNumber={setActiveNumber}/>);

    expect(wrapper.text()).toEqual('<ButtonNumbersList />');
    expect(wrapper.html()).toContain('button');
    expect(wrapper.html()).toContain('plug');
  })
})