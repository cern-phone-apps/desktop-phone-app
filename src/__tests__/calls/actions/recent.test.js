import * as actions from 'calls/actions/recent'

describe('status actions', () => {
  it('should create an action to add a recent call', () => {
    const recentCall = {
      test: 'test'
    }
    const expectedAction = {
      type: actions.ADD_RECENT_CALL,
      recentCall
    }

    expect(actions.addRecentCall(recentCall)).toEqual(expectedAction)
  })


})
