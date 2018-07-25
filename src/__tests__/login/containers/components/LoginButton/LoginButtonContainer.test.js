import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {LoginButtonContainer} from 'login/containers/components'
import {routerMiddleware} from 'react-router-redux'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('LoginButton Container', () => {
  let wrapper, store;

  let storeContent = {
    auth: {
      loggedIn: false,
      loginInProgress: false,
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
    wrapper = shallow(<LoginButtonContainer t={key => key} store={store}/>)
  });

  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      loggedIn: false,
      urlQuery: expect.any(String)
    }));
  });

  // it('maps onIncrement to dispatch increment action', () => {
  //   wrapper.props().onIncrement();
  //
  //   expect(store.dispatch).toHaveBeenCalledWith({type: 'INCREMENT'});
  // });
});