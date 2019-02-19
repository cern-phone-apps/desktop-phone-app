import React from 'react'
import {MicrophoneField} from 'settings/components/DeviceSettings/MicrophoneField'

it('constructs without crashing', () => {

  const setMicrophone = jest.fn();

  const wrapper = shallow(<MicrophoneField fieldLabel={'microphoneFieldLabel'} fieldId={'microphoneFieldId'} setMicrophone={setMicrophone} />);

  expect(wrapper.text()).toBe('<FormField />');
  expect(wrapper.unmount()).toHaveLength(1);
});

it('constructs without crashing with device', () => {

  const setMicrophone = jest.fn();

  const wrapper = shallow(<MicrophoneField inputDevice={'inputDevice'} fieldLabel={'microphoneFieldLabel'} fieldId={'microphoneFieldId'} setMicrophone={setMicrophone} />);

  expect(wrapper.text()).toBe('<FormField />');
});
