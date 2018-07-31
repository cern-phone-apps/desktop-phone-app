import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {StatusDropdownContainer} from 'calls/containers/components/StatusDropdown/StatusDropdownContainer'
import {statuses} from 'calls/components/StatusDropdown/StatusDropdown'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('StatusDropdown Container', () => {
  let wrapper, store

  let storeContent = {
    calls: {
      status: statuses.available
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent)
    store.dispatch = jest.fn()
    const disconnect = jest.fn()
    wrapper = shallow(<StatusDropdownContainer
      store={store}
      disconnect={disconnect}
    />)
  })
  //
  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      status: statuses.available
    }))
  })
})
