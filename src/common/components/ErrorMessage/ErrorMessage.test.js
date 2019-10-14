import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

global.remote = {
  require: jest.fn()
};

describe('ErrorMessage tests', () => {
  it('renders component and includes one error', async () => {
    const errors = [{ message: 'This is error 1', statusCode: '1' }];
    const { getByText, asFragment } = render(<ErrorMessage errors={errors} />);

    await waitForElement(() => getByText('This is error 1 (1)'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders null without any errors', async () => {
    const { container } = render(<ErrorMessage />);
    expect(container.firstChild).toBeNull();
  });

  it('renders component and includes one error and solutions', async () => {
    const errors = [{ message: 'This is error 1', statusCode: '1' }];
    const solutions = [
      'This is solution 1',
      'This is solution 2',
      'This is solution 3'
    ];
    const { getByText, asFragment } = render(
      <ErrorMessage errors={errors} solutions={solutions} />
    );

    await waitForElement(() => getByText('This is error 1 (1)'));
    await waitForElement(() => getByText('This is solution 1'));
    await waitForElement(() => getByText('This is solution 2'));
    await waitForElement(() => getByText('This is solution 3'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component and includes multiple errors', async () => {
    const errors = [
      { message: 'This is error 1', statusCode: '1' },
      { message: 'This is error 2', statusCode: '2' }
    ];
    const { getByText, asFragment } = render(<ErrorMessage errors={errors} />);

    await waitForElement(() => getByText('An error has occurred'));
    await waitForElement(() => getByText('This is error 1 (1)'));
    await waitForElement(() => getByText('This is error 2 (2)'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders multiple errors without solutions', async () => {
    const errors = [
      { message: 'This is error 1', statusCode: '1' },
      { message: 'This is error 2', statusCode: '2' }
    ];
    const solutions = [
      'This is solution 1',
      'This is solution 2',
      'This is solution 3'
    ];
    const { getByText, asFragment, queryByText } = render(
      <ErrorMessage errors={errors} solutions={solutions} />
    );

    await waitForElement(() => getByText('This is error 1 (1)'));

    const solution1Text = queryByText('This is solution 1');
    expect(solution1Text).toBeNull(); // it doesn't exist
    const solution2Text = queryByText('This is solution 2');
    expect(solution2Text).toBeNull(); // it doesn't exist
    const solution3Text = queryByText('This is solution 3');
    expect(solution3Text).toBeNull(); // it doesn't exist

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles click on close button', async () => {
    const errors = [{ message: 'This is error 1', statusCode: '1' }];
    const { getByText, container } = render(<ErrorMessage errors={errors} />);
    await waitForElement(() => getByText('This is error 1 (1)'));
    expect(container.firstChild).not.toBeNull();
    // When clicked on the close button, the component will return null
    const foo = container.querySelector('i');
    fireEvent.click(foo);
    expect(container.firstChild).toBeNull();
  });
});
