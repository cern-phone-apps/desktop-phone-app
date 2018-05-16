import * as callActions from 'actions/calls/call'

export function makeCall (recipient) {
  console.debug('dispatching makeCall')
  return {
    type: callActions.CALL,
    recipient
  }
}

describe('call actions', () => {
  it('should create an action to make call', () => {
    const recipient = 'Finish docs'
    const expectedAction = {
      type: callActions.CALL,
      recipient
    }
    expect(callActions.makeCall(recipient)).toEqual(expectedAction)
  })

  it('should create an action to is calling', () => {
    const expectedAction = {
      type: callActions.IS_CALLING
    }
    expect(callActions.isCalling()).toEqual(expectedAction)
  })

  it('should create an action to is receiving call', () => {
    const expectedAction = {
      type: callActions.IS_RECEIVING_CALL
    }
    expect(callActions.isReceivingCall()).toEqual(expectedAction)
  })

  it('should create an action to is accept call', () => {
    const expectedAction = {
      type: callActions.CALL_ACCEPTED
    }
    expect(callActions.acceptCall()).toEqual(expectedAction)
  })

  it('should create an action to reject call', () => {
    const expectedAction = {
      type: callActions.CALL_REJECTED
    }
    expect(callActions.rejectCall()).toEqual(expectedAction)
  })

  it('should create an action to miss call', () => {
    const expectedAction = {
      type: callActions.CALL_MISSED
    }
    expect(callActions.missCall()).toEqual(expectedAction)
  })
})
