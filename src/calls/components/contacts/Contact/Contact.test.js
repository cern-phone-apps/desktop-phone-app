import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import Contact from './Contact';

global.remote = {
  require: jest.fn()
};

describe('Contact tests', () => {
  it('renders empty List without any errors', async () => {
    const { asFragment } = render(
      <Contact
        selectContact={() => {}}
        contact={{
          displayName: 'Username'
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
