import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import UserProfileExtraInfo from './UserProfileExtraInfo';

global.remote = {
  require: jest.fn()
};

describe('UserProfileExtraInfo', () => {
  it('renders the component', () => {
    const { container } = render(
      <UserProfileExtraInfo
        mail="johndoe1@cern.ch"
        physicalDeliveryOfficeName="28/1-002"
        username="Name and Surname"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders component and includes text', async () => {
    const { getByText } = render(
      <UserProfileExtraInfo
        mail="johndoe@cern.ch"
        physicalDeliveryOfficeName="28/1-002"
      />
    );

    await waitForElement(() => getByText(/johndoe@cern.ch/i));
    await waitForElement(() => getByText('28/1-002'));
  });
});
