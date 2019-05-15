import React from 'react'
import {CallsSettings} from 'settings/components/CallsSettings/CallsSettings'

it('renders without crashing', () => {
  const wrapper = shallow(<CallsSettings />);

  expect(wrapper.text()).toBe('<ErrorBoundary />');
  expect(wrapper.unmount()).toHaveLength(1);
});
