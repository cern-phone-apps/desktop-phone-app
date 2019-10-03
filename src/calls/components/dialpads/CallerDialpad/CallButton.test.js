import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { CallButton } from './CallButton';

global.remote = {
  require: jest.fn()
};

describe('AppInfo', () => {
  const clickHandlerFunc = jest.fn();
  const content = <div>Make a call</div>;

  it('renders component and includes text', async () => {
    const { getByText } = render(
      <CallButton
        t={key => key}
        clickHandler={clickHandlerFunc}
        content={content}
      />
    );

    await waitForElement(() => getByText(/Make a call/i));
  });
});
