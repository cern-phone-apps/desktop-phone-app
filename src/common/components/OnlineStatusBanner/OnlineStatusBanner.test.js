import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import OnlineStatusBanner from './OnlineStatusBanner';

global.remote = {
  require: jest.fn()
};

describe('OnlineStatusBanner tests', () => {
  const setOnlineStatus = jest.fn();

  it('renders component with onlineStatus=true', async () => {
    const { container } = render(
      <OnlineStatusBanner onlineStatus setOnlineStatus={setOnlineStatus} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders null without any errors', async () => {
    const { asFragment, getByText } = render(
      <OnlineStatusBanner
        onlineStatus={false}
        setOnlineStatus={setOnlineStatus}
      />
    );
    await waitForElement(() =>
      getByText(
        'You are currently offline. Please, check your network connection'
      )
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
