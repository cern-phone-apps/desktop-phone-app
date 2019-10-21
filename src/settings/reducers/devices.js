import * as devices from 'settings/actions/devices';

const initialState = {
  microphone: null,
  speaker: null,
  speakerRingtone: null
};

/**
 * Reducer used to identify the devices used in the application
 *
 * @param state Current state of the application
 * @param action Action to be triggered
 * @returns {{microphone: null, speaker: null, speakerRingtone: null}}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case devices.SET_MICROPHONE:
      return {
        ...state,
        microphone: action.deviceId
      };
    case devices.SET_SPEAKER:
      return {
        ...state,
        speaker: action.deviceId
      };
    case devices.SET_RINGTONE_SPEAKER:
      return {
        ...state,
        speakerRingtone: action.deviceId
      };
    default:
      return state;
  }
};
