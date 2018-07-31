import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {MainPageContainer} from 'common/containers/screens/MainPage/MainPageContainer'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('MainPage Container', () => {
  let wrapper, store;

  let storeContent = {
    sidebar: {
      isVisible: false,
      contentDimmed: false
    },
    auth: {
      errors: {},
      loginInProgress: false
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent);
    store.dispatch = jest.fn();
    wrapper = shallow(<MainPageContainer store={store}/>)
  });

  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      isVisible: false,
      contentDimmed: false,
      displaySidebar: expect.any(Function),
      displayingSidebar: expect.any(Function),
      finishedDisplayingSidebar: expect.any(Function),
      hideSidebar: expect.any(Function)
    }));
  });
});