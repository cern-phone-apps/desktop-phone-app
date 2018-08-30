import {shallow} from 'enzyme'
import React from 'react'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'
import {CalleeProfileNumberContainer} from 'calls/containers/components/CalleeProfile/CalleeProfileNumberContainer'

const history = createHistory()
const middlewares = [thunk, routerMiddleware(history)]
const mockStore = configureMockStore(middlewares)

describe('CalleeProfileNumber Container', () => {
  let wrapper, store
  const unSelect = jest.fn()

  let storeContent = {
    auth: {
      loggedIn: false,
      loginInProgress: false,
      errors: {}
    },
    router: {
      location: {
        pathname: '/',
        search: '',
        hash: ''
      }
    },
    calls: {
      search: {
        unSelectUser: unSelect
      },
      profile: {
        profile: {
          recipientName: "test name"
        },
        fetching: false
      },
      call: {
        calling: false
      }
    }
  }

  beforeEach(() => {
    store = mockStore(storeContent)
    store.dispatch = jest.fn()
    wrapper = shallow(<CalleeProfileNumberContainer
      store={store}
      phoneNumber={'12345'}
      recipientName={'name example'}
      icon={'phone'}
      phoneService = {{}}
    />)
  })

  it('maps state and dispatch to props', () => {
    expect(1).toEqual(1)
      expect(wrapper.props()).toEqual(expect.objectContaining({
        phoneNumber: '12345',
        icon: 'phone',
        recipientName: 'name example'
      }))
  })
})
