import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import ToggleButtonContainer from 'common/containers/components/ToggleButton/ToggleButtonContainer'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('ToggleButton Container', () => {
  let wrapper, store

  let storeContent = {
    sidebar: {
      isVisible: false,
      displayTime: 500
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent)
    store.dispatch = jest.fn()
    wrapper = shallow(<ToggleButtonContainer store={store}/>)
  })

  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      isVisible: false,
      displaySidebar: expect.any(Function),
      displayingSidebar: expect.any(Function),
      finishedDisplayingSidebar: expect.any(Function),
      hideSidebar: expect.any(Function),
      displayTime: expect.any(Number)
    }))
  })
})
