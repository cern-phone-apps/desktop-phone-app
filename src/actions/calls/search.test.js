import * as actions from 'actions/calls/search'

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
})
