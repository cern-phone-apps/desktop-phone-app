import configureMockStore from 'redux-mock-store'
import {apiMiddleware} from 'redux-api-middleware'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from 'actions/calls/search'

const middlewares = [thunk, apiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('search actions', () => {
  it('should create an action to select user', () => {
    const expectedAction = {
      type: actions.USER_SELECTED
    }
    expect(actions.selectUser()).toEqual(expectedAction)
  })

  it('should create an action to unselect user', () => {
    const expectedAction = {
      type: actions.USER_NOT_SELECTED
    }
    expect(actions.unSelectUser()).toEqual(expectedAction)
  })

  it('should create an action to update search value', () => {
    const value = {value: 'USERNAME'}
    const expectedAction = {
      type: actions.SEARCH_UPDATED,
      value
    }
    expect(actions.updateSearchValue(value)).toEqual(expectedAction)
  })

  it('should create and endpoint for the search api', () => {
    const value = 'USERNAME'
    const expectedResult = `https://hostname/api/users/?username=${value}`
    expect(actions.buildSearchEndpoint(value)).toEqual(expectedResult)
  })

  // it('should make a request to the users search api', async () => {
  //   const value = 'USERNAME'
  //   nock('https://hostname')
  //     .get(`/api/users/?username=${value}`)
  //     .reply(200, {payload: 'OK!'})
  //
  //   const expectedActions = [
  //     { type: 'SEARCH_REQUEST', payload: undefined, meta: undefined },
  //     { type: 'SEARCH_SUCCESS', payload: { payload: 'OK!' }, meta: undefined },
  //     { type: 'SEARCH_FAILURE', payload: { payload: 'OK!' }, meta: undefined }
  //   ]
  //
  //   const store = createMockStore({})
  //   store.dispatch(actions.searchUsers(value))
  //
  //   // const expectedResult = `https://hostname/api/users/?username=${value}`
  //   // expect(actions.searchUsers(value)).toEqual(expectedResult)
  // })
})

describe('redux-api-middleware test', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('should dispatch xxx when myActionCreator being called', () => {
    const value = 'USERNAME'
    const body = [{division: 'DIVISION', cernGroup: 'GROUP', cernSection: 'SECTION', displayName: 'NAME'}]
    fetchMock.getOnce(`https://hostname/api/users/?username=${value}`,
      { body: body, headers: { 'content-type': 'application/json' } })
    const expectedActions = [
      { type: actions.SEARCH_REQUEST },
      { type: actions.SEARCH_SUCCESS, payload: body }
    ]
    const store = mockStore({})
    return store.dispatch(actions.searchUsers(value)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
