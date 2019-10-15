import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import ErrorMessageContainer from './ErrorMessageContainer';

const history = createHashHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe('ErrorMessageContainer test', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      call: {
        error: undefined
      },
      connection: {
        error: undefined
      },
      numbers: {
        error: undefined
      },
      auth: {
        error: undefined
      }
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders component and includes undefined store props', async () => {
    const { container, asFragment } = render(
      <Provider store={store}>
        <ErrorMessageContainer t={key => key} />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component and includes call error on store props', async () => {
    initialState.call.error = { message: 'This is error 1', statusCode: '1' };

    const { getByText, asFragment } = render(
      <Provider store={store}>
        <ErrorMessageContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByText('This is error 1 (1)'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component and includes connection error on store props', async () => {
    initialState.connection.error = {
      message: 'This is error 1',
      statusCode: '1'
    };

    const { getByText, asFragment } = render(
      <Provider store={store}>
        <ErrorMessageContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByText('This is error 1 (1)'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component and includes numbers error on store props', async () => {
    initialState.numbers.error = {
      message: 'This is error 1',
      statusCode: '1'
    };

    const { getByText, asFragment } = render(
      <Provider store={store}>
        <ErrorMessageContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByText('This is error 1 (1)'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component and includes auth error on store props', async () => {
    initialState.auth.error = {
      message: 'This is error 1',
      statusCode: '1'
    };

    const { getByText, asFragment } = render(
      <Provider store={store}>
        <ErrorMessageContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByText('This is error 1 (1)'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component and includes all errors in props', async () => {
    initialState.call.error = {
      message: 'This is error 1',
      statusCode: '1'
    };
    initialState.connection.error = {
      message: 'This is error 2',
      statusCode: '2'
    };
    initialState.numbers.error = {
      message: 'This is error 3',
      statusCode: '3'
    };
    initialState.auth.error = {
      message: 'This is error 4',
      statusCode: '4'
    };

    const { getByText, asFragment } = render(
      <Provider store={store}>
        <ErrorMessageContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByText('This is error 1 (1)'));
    await waitForElement(() => getByText('This is error 2 (2)'));
    await waitForElement(() => getByText('This is error 3 (3)'));
    await waitForElement(() => getByText('This is error 4 (4)'));

    expect(asFragment()).toMatchSnapshot();
  });
});
