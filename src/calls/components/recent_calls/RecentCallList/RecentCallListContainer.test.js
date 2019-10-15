import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import RecentCallListContainer from './RecentCallListContainer';

const history = createHashHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe('RecentCallListContainer test', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      recent: {
        recentCalls: []
      }
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders empty list', async () => {
    const { getByTestId, asFragment } = render(
      <Provider store={store}>
        <RecentCallListContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByTestId('RecentCallList'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a List without any errors', async () => {
    initialState.recent.recentCalls = [
      {
        name: '12345',
        endTime: 12345,
        phoneNumber: '222333',
        missed: true,
        incoming: true
      },
      {
        name: '123456',
        endTime: 12345,
        phoneNumber: '444555',
        missed: false,
        incoming: false
      }
    ];

    const { getByTestId, asFragment } = render(
      <Provider store={store}>
        <RecentCallListContainer t={key => key} />
      </Provider>
    );
    await waitForElement(() => getByTestId('RecentCallList'));
    await waitForElement(() => getByTestId('recent-0'));
    await waitForElement(() => getByTestId('recent-1'));
    expect(asFragment()).toMatchSnapshot();
  });
});
