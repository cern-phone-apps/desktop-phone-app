import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import { LoadingDimmer } from './LoadingDimmer';

describe('LoadingDimmer', () => {
  it('renders component and includes store props', async () => {
    const { getByText } = render(<LoadingDimmer t={key => key} />);

    await waitForElement(() => getByText(/loadingText/i));
  });
});
