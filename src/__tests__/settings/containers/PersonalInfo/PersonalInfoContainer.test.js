import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import PersonalInfoContainer from 'settings/components/PersonalInfo/PersonalInfoContainer'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('PersonalInfo Container', () => {
  let wrapper, store
  let storeContent = {
    user: {
      me: {
        username: 'example',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email@cern.ch'
      }
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent)
    store.dispatch = jest.fn()
    wrapper = shallow(<PersonalInfoContainer store={store}/>)
  })

  it('maps state and dispatch to props', () => {
    expect(wrapper.props()).toEqual(expect.objectContaining({
      email: 'email@cern.ch',
      username: 'example',
      firstName: 'firstName',
      lastName: 'lastName'
    }))
  })
})
