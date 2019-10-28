import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import ContactProfileModal from './ContactProfileModal';

global.remote = {
  require: jest.fn()
};

describe('ContactProfileModal tests', () => {
  it('Render ContactProfileModal and compare with the snapshot', async () => {
    const { asFragment } = render(
      <ContactProfileModal
        modalOpen={true}
        profile={{
          mail: 'testmail@cern.ch',
          physicalDeliveryOfficeName: 'Name',
          username: 'username',
          phones: [67323, 52323, 2523],
          displayName: 'User Name',
          division: 'IT',
          cernGroup: 'CDA',
          cernSecction: 'IC'
        }}
        fetching={true}
        unSelectContact={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
