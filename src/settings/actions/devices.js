export const SET_MICROPHONE = '@@settings/SET_MICROPHONE';
export const SET_SPEAKER = '@@settings/SET_SPEAKER';
export const SET_RINGTONE_SPEAKER = '@@settings/SET_RINGTONE_SPEAKER';

/**
 * Action that handles the change of microphone
 * @param deviceId Webrtc ID of the device
 * @returns {{type: string, deviceId: *}} The new microphone ID
 */
export function setMicrophone(deviceId) {
  return {
    type: SET_MICROPHONE,
    deviceId
  };
}

/**
 * Action that handles the change of output device (speakers, headset...)
 * @param deviceId WebRTC id of the device
 * @returns {{type: string, deviceId: *}} The new speakers ID
 */
export function setSpeaker(deviceId) {
  return {
    type: SET_SPEAKER,
    deviceId
  };
}

/**
 * Action that handles the change of output device for the ring tone
 * @param deviceId WebRTC id of the device
 * @returns {{type: string, deviceId: *}} The new speakers ID
 */
export function setSpeakerRingtone(deviceId) {
  return {
    type: SET_RINGTONE_SPEAKER,
    deviceId
  };
}
