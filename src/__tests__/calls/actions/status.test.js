import * as actions from 'calls/actions/status'

describe('status actions', () => {
  it('should create an action to set user available', () => {
    const expectedAction = {
      type: actions.SET_AVAILABLE
    }
    expect(actions.setUserAvailable()).toEqual(expectedAction)
  })

  it('should create an action to set user invisible', () => {
    const expectedAction = {
      type: actions.SET_INVISIBLE
    }
    expect(actions.setUserInvisible()).toEqual(expectedAction)
  })

  it('should create an action to set user available', () => {
    const expectedAction = {
      type: actions.SET_DO_NOT_DISTURB
    }
    expect(actions.setUserDoNotDisturb()).toEqual(expectedAction)
  })
})
