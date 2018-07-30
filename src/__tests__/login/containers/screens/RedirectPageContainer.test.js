import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {RedirectPageContainer} from 'login/containers/screens/RedirectPage/RedirectPageContainer'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('RedirectPage Container', () => {
  let wrapper, store;

  let storeContent = {
    auth: {
      isAuthenticated: false,
      errors: {}
    },
    router: {
      location: {
        pathname: "/",
        search: "",
        hash: ""
      }
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<RedirectPageContainer t={key => key} store={store}/>)
  });

  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      isAuthenticated: false,
      urlQuery: expect.any(String)
    }));
  });
});