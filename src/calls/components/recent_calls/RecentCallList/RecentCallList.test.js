import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import RecentCallList from './RecentCallList';
import PhoneProviderContainer from 'calls/providers/PhoneProvider/PhoneProviderContainer';
import { Provider } from 'react-redux';

global.remote = {
  require: jest.fn()
};

describe('RecentCallList tests', () => {
  it('renders empty List without any errors', async () => {
    const { asFragment, getByTestId } = render(<RecentCallList />);
    await waitForElement(() => getByTestId('RecentCallList'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a List without any errors', async () => {
    const recentCalls = [
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
    const { asFragment, getByTestId } = render(
      <RecentCallList recentCalls={recentCalls} />
    );
    await waitForElement(() => getByTestId('RecentCallList'));
    await waitForElement(() => getByTestId('recent-0'));
    await waitForElement(() => getByTestId('recent-1'));
  });

  it('handles the recent call click and modal close', async () => {
    const recentCalls = [
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

    const history = createHashHistory();
    const middlewares = [thunk, routerMiddleware(history)];
    const mockStore = configureMockStore(middlewares);

    const initialState = {
      status: {
        doNotDisturb: false
      },
      call: {
        tempRemote: null
      },
      auth: {
        authToken: null
      },
      settings: {
        devices: []
      },
      connection: {
        connected: true
      }
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const { getByTestId, queryByTestId, container, getByLabelText } = render(
      <Provider store={store}>
        <PhoneProviderContainer>
          <RecentCallList recentCalls={recentCalls} />
        </PhoneProviderContainer>
      </Provider>
    );
    await waitForElement(() => getByTestId('RecentCallList'));
    await waitForElement(() => getByTestId('recent-0'));
    await waitForElement(() => getByTestId('recent-1'));

    expect(queryByTestId('RecentCallModal')).toBeNull();
    // TODO Test this. Currently it's hard since it expects UserPhoneNumberButton to have a phoneService
    // Unfortunatly, the imports are provoking an error.
    const firstRecentCall = await getByTestId('recent-0');
    fireEvent.click(firstRecentCall);
    await waitForElement(() => getByTestId('RecentCallModal'));
    const closeButton = getByLabelText('Close call details modal');

    fireEvent.click(closeButton);
    expect(queryByTestId('RecentCallModal')).toBeNull();
  });
});
