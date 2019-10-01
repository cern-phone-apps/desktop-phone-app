import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { AppInfo } from 'settings/components/AppInfo/AppInfo';

global.remote = {
  require: jest.fn()
};

it('renders without crashing', async () => {
  const { getByText } = render(<AppInfo t={key => key} />);

  await waitForElement(() => getByText(/appInfo.header/i));
});
