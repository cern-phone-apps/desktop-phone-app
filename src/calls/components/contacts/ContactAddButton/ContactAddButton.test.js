import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import ContactAddButton from './ContactAddButton';

const history = createHashHistory();
const middlewares = [thunk, routerMiddleware(history)];
const mockStore = configureMockStore(middlewares);

describe('ContactAddButton tests', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      contacts: {
        getContacts: {
          contacts: []
        },
        addContacts: {
          added: false
        },
        removeContacts: {
          removed: false
        }
      }
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders the component with not added contact', async () => {
    const contact = {
      personId: '222333'
    };
    const { asFragment, queryByTestId, getByTestId } = render(
      <Provider store={store}>
        <ContactAddButton contact={contact} />
      </Provider>
    );
    await waitForElement(() => getByTestId('HasNoContactIcon'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the component with added contact', async () => {
    const contact = {
      personId: '222333',
      username: 'lesknope'
    };
    initialState.contacts.getContacts.contacts.contacts = [contact];
    const { asFragment, queryByTestId, getByTestId } = render(
      <Provider store={store}>
        <ContactAddButton contact={contact} />
      </Provider>
    );
    await waitForElement(() => getByTestId('HasContactIcon'));
    expect(asFragment()).toMatchSnapshot();
  });
});
