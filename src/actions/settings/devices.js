export const SET_MICROPHONE = 'SET_MICROPHONE'
export const SET_SPEAKER = 'SET_SPEAKER'

export function setMicrophone (deviceId) {
  return {
    type: SET_MICROPHONE,
    deviceId
  }
}

export function setSpeaker (deviceId) {
  return {
    type: SET_SPEAKER,
    deviceId
  }
}
