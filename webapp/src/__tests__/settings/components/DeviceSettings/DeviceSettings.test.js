import React from 'react'
import {DeviceSettings} from 'settings/components/DeviceSettings/DeviceSettings'

it('renders without crashing', () => {

  const t = jest.fn();

  const wrapper = shallow(<DeviceSettings t={t} />);

  expect(wrapper.text()).toBe('<ErrorBoundary />');
  expect(wrapper.unmount()).toHaveLength(1);
});
