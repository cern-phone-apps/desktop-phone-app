import React from 'react';
import PhoneProviderContainer from 'calls/providers/PhoneProvider/PhoneProviderContainer';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import RecentCallModal from './RecentCallModal';

global.remote = {
  require: jest.fn()
};

const history = createHashHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe('RecentCallModal tests', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
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
      }
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders the modal closed', async () => {
    const recentCalls = [
      {
        name: 'John Doe',
        endTime: 12345,
        phoneNumber: '222333',
        missed: true,
        incoming: true,
        startTime: 45678
      }
    ];
    const { asFragment, queryByTestId } = render(
      <RecentCallModal selectedCall={recentCalls[0]} open={false} />
    );
    const modal = queryByTestId('RecentCallModal');
    expect(modal).toBeNull();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the modal open', async () => {
    const recentCalls = [
      {
        name: 'John Doe',
        endTime: 12345,
        phoneNumber: '222333',
        missed: true,
        incoming: true,
        startTime: 45678
      }
    ];
    const { getByTestId } = render(
      <Provider store={store}>
        <PhoneProviderContainer>
          <RecentCallModal selectedCall={recentCalls[0]} open />
        </PhoneProviderContainer>
      </Provider>
    );
    await waitForElement(() => getByTestId('RecentCallModal'));
  });

  it('renders the modal open without startTime', async () => {
    const recentCalls = [
      {
        name: 'John Doe',
        endTime: 12345,
        phoneNumber: '222333',
        missed: true,
        incoming: true
      }
    ];
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <PhoneProviderContainer>
          <RecentCallModal selectedCall={recentCalls[0]} open />
        </PhoneProviderContainer>
      </Provider>
    );
    await waitForElement(() => getByTestId('RecentCallModal'));
    await waitForElement(() => getByLabelText('Incoming and missed call'));
  });

  it('renders the modal open not missed not incoming', async () => {
    const recentCalls = [
      {
        name: 'John Doe',
        endTime: 12345,
        phoneNumber: '222333',
        missed: false,
        incoming: false,
        startTime: 45678
      }
    ];
    const {
      getByTestId,
      asFragment,
      getByText,
      getAllByText,
      getByLabelText
    } = render(
      <Provider store={store}>
        <PhoneProviderContainer>
          <RecentCallModal selectedCall={recentCalls[0]} open />
        </PhoneProviderContainer>
      </Provider>
    );
    await waitForElement(() => getByTestId('RecentCallModal'));
    await waitForElement(() => getAllByText('222333'));
    await waitForElement(() => getByText('a few seconds'));
    await waitForElement(() => getByText('Call details'));
    await waitForElement(() => getByLabelText('Call duration icon'));
    await waitForElement(() => getByLabelText('Outgoing and picked up call'));
    expect(asFragment()).toMatchSnapshot();
  });
});
