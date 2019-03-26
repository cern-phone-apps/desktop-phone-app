import React from 'react'
import {SpeakersField} from 'settings/components/DeviceSettings/SpeakersField/SpeakersField'

it('constructs without crashing', () => {

  const setSpeaker = jest.fn();

  const wrapper = shallow(<SpeakersField setSpeaker={setSpeaker} fieldLabel={'fieldLabel'} fieldId={'fieldId'} />);

  expect(wrapper.text()).toBe('<FormField />');
  expect(wrapper.unmount()).toHaveLength(1);
});

it('constructs without crashing with device', () => {

  const setSpeaker = jest.fn();

  const wrapper = shallow(<SpeakersField outputDevice={'outputDevice'} fieldLabel={'fieldLabel'} fieldId={'fieldId'} setSpeaker={setSpeaker} />);

  expect(wrapper.text()).toBe('<FormField />');
});
