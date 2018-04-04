import * as devices from 'actions/settings/devices'

const initialState = {
  microphone: null,
  speaker: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case devices.SET_MICROPHONE:
      return {
        ...state,
        microphone: action.deviceId
      }
    case devices.SET_SPEAKER:
      return {
        ...state,
        speaker: action.deviceId
      }
    default:
      return state
  }
}
