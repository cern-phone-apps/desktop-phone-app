import * as actions from 'settings/actions/devices'

describe('devices actions', () => {
  it('should create an action to set the microphone', () => {
    const deviceId = '123456'
    const expectedAction = {
      type: actions.SET_MICROPHONE,
      deviceId
    }
    expect(actions.setMicrophone(deviceId)).toEqual(expectedAction)
  })

  it('should create an action to set the speaker', () => {
    const deviceId = '123456'
    const expectedAction = {
      type: actions.SET_SPEAKER,
      deviceId
    }
    expect(actions.setSpeaker(deviceId)).toEqual(expectedAction)
  })
})
