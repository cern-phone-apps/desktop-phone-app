import React from 'react'
import {shallow} from 'enzyme'
import PhoneRingingIcon from './PhoneRingingIcon'

it('renders without crashing', () => {
  const icon = shallow(<PhoneRingingIcon/>);

  expect(icon.text()).toEqual('');
  expect(icon.html()).toEqual('<i class=\"Phone is-animating\"></i>');
})