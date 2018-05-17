import configureMockStore from 'redux-mock-store'
import {apiMiddleware} from 'redux-api-middleware'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from 'actions/auth'

const middlewares = [thunk, apiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('async auth actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should dispatch LOGIN_SUCCESS when login is called', () => {
    const authCode = '12345'
    const body = {
      login: true
    }
    fetchMock.postOnce(`https://hostname/api/auth/login/`,
      {body: body, headers: {'content-type': 'application/json'}})
    const expectedActions = [
      {type: actions.LOGIN_REQUEST},
      {type: actions.LOGIN_SUCCESS, payload: body}
    ]
    const store = mockStore({})
    return store.dispatch(actions.login(authCode)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
