import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {UserSearchContainer} from 'calls/containers/components/UserSearch/UserSearchContainer'
import PropTypes from 'prop-types'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('UserSearch Container', () => {
  let wrapper, store;

  let storeContent = {
    calls: {
      search: {
        userSelected: false,
        value: "",
        searchResults: [],
      },
      dialpad:{
        display: false
      }
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<UserSearchContainer
      store={store}
    />)
  });

  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      userSelected: expect.any(Boolean),
      value: expect.any(String),
      selectUser: expect.any(Function),
      unSelectUser: expect.any(Function),
      updateSearchValue: expect.any(Function),
      searchUsers: expect.any(Function),
      results: expect.any(Array),
      displayDialpad: expect.any(Boolean)
    }));
  });

});