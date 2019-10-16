import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import Timer from './Timer';

global.remote = {
  require: jest.fn()
};

describe('Timer tests', () => {
  it('renders without props', async () => {
    const { getByText, getByLabelText } = render(<Timer />);
    // expect(container.firstChild).toBeNull();
    await waitForElement(() => getByText(':'));
    await waitForElement(() => getByText('00'));
    await waitForElement(() => getByLabelText('Seconds'));
    await waitForElement(() => getByLabelText('Minutes'));
  });

  it('renders with props', async () => {
    const { getByLabelText } = render(<Timer startTime={12345} />);
    // expect(container.firstChild).toBeNull();
    await waitForElement(() => getByLabelText('Minutes'));
    await waitForElement(() => getByLabelText('Seconds'));
  });
});
