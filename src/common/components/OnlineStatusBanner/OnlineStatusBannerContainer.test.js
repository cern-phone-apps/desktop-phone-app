import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import OnlineStatusBannerContainer from './OnlineStatusBannerContainer';

const history = createHashHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe('OnlineStatusBannerContainer test', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      call: {
        error: undefined
      },
      connection: {
        connected: true
      },
      numbers: {
        error: undefined
      },
      auth: {
        error: undefined
      },
      settings: {
        settings: {
          onlineStatus: true
        }
      }
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders component with online status', async () => {
    const { container, asFragment } = render(
      <Provider store={store}>
        <OnlineStatusBannerContainer />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders component with offline status', async () => {
    initialState.settings.settings.onlineStatus = false;

    const { getByText, asFragment } = render(
      <Provider store={store}>
        <OnlineStatusBannerContainer />
      </Provider>
    );
  });
});
