import React from 'react'
import {shallow} from 'enzyme'
// import { expect } from 'chai';
import {default as Dialpad, CallButton as CallButton, DialButton} from 'calls/components/Dialpad/Dialpad'
import {Icon} from 'semantic-ui-react'

it('renders Dialpad without crashing', () => {
  const dialpad = shallow(<Dialpad
  updateSearchValue={() => {}}
  searchValue={''}
  makeCall={()=> {}}
  />);

  expect(dialpad.text()).toEqual('<Segment />');

})

it('Dialpad contains 10 numbers', () => {
  const dialpad = shallow(<Dialpad
    updateSearchValue={() => {}}
    searchValue={''}
    makeCall={()=> {}}
  />);

  expect(dialpad.html()).toContain('1');
  expect(dialpad.html()).toContain('2');
  expect(dialpad.html()).toContain('3');
  expect(dialpad.html()).toContain('4');
  expect(dialpad.html()).toContain('5');
  expect(dialpad.html()).toContain('6');
  expect(dialpad.html()).toContain('7');
  expect(dialpad.html()).toContain('8');
  expect(dialpad.html()).toContain('9');
  expect(dialpad.html()).toContain('0');

})

it('renders CallButton without crashing', () => {
  const button = shallow(<CallButton
    clickHandler={() => {}}
    text={<Icon name={'phone'}/>}
  />);


})

it('renders DialButton without crashing', () => {
  const button = shallow(<DialButton
    clickHandler={() => {}}
    longPressHandler={() => {}}
    symbol={'7'}
    alt={'+'}
  />);


})


it('handles DialButton short press', () => {
  const onClick = jest.fn();
  const longPress = jest.fn();

  const button = shallow(<DialButton
    clickHandler={onClick}
    longPressHandler={longPress}
    symbol={'7'}
    longPressTimeout={0}
  />);
  const div = button.find('.DialButton');

  div.simulate('mousedown');
  div.simulate('mouseup');
  expect(onClick).toHaveBeenCalled()
})


it('handles DialButton long press', () => {
  const onClick = jest.fn();
  const longPress = jest.fn();

  const button = shallow(<DialButton
    clickHandler={onClick}
    longPressHandler={longPress}
    symbol={'7'}
    longPressTimeout={1}
  />);
  const div = button.find('.DialButton');
  div.simulate('mousedown');
  setTimeout(2, () => {
    div.simulate('mouseup');
    expect(longPress).toHaveBeenCalled()
  })



})