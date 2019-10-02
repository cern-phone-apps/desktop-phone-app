import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { PersonalInfo } from './PersonalInfo';

const history = createHashHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe('PersonalInfo', () => {
  let store;
  const storeContent = {
    numbers: {
      activeNumber: '12345'
    },
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: '1234567890',
      phone: '0987654321',
      mobile: '6574389021'
    }
  };

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
  });

  it('renders component and includes store props', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <PersonalInfo t={key => key} />
      </Provider>
    );

    await waitForElement(() => getByText(/personalInfo.header/i));
    await waitForElement(() => getByText(/John Doe/i));
    await waitForElement(() => getByText(/1234567890/i));
    await waitForElement(() => getByText(/0987654321/i));
    await waitForElement(() => getByText(/6574389021/i));
  });
});
