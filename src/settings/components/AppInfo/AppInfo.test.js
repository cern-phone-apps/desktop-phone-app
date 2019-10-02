import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { AppInfo } from 'settings/components/AppInfo/AppInfo';

global.remote = {
  require: jest.fn()
};

describe('AppInfo', () => {
  it('renders component and includes text', async () => {
    const { getByText } = render(<AppInfo t={key => key} />);

    await waitForElement(() => getByText(/appInfo.header/i));
  });
});
