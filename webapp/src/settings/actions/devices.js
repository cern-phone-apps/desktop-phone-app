export const SET_MICROPHONE = '@@settings/SET_MICROPHONE'
export const SET_SPEAKER = '@@settings/SET_SPEAKER'

/**
 * Action that handles the change of microphone
 * @param deviceId Webrtc ID of the device
 * @returns {{type: string, deviceId: *}} The new microphone ID
 */
export function setMicrophone (deviceId) {
  return {
    type: SET_MICROPHONE,
    deviceId
  }
}

/**
 * Action that handles the change of output device (speakers, headset...)
 * @param deviceId WebRTC id of the device
 * @returns {{type: string, deviceId: *}} The new speakers ID
 */
export function setSpeaker (deviceId) {
  return {
    type: SET_SPEAKER,
    deviceId
  }
}
