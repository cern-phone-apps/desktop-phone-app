import React from 'react'
import {AppInfo} from 'settings/components/AppInfo/AppInfo'

it('renders without crashing', () => {
  const testFunction = jest.fn();

  const wrapper = shallow(<AppInfo t={testFunction} />);

  expect(wrapper.text()).toBe('<ErrorBoundary />');
});
