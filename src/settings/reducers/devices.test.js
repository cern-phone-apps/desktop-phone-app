import reducer from './devices';
import * as actions from '../actions/devices';

describe('devices reducer', () => {
  const initialState = {
    microphone: null,
    speaker: null,
    speakerRingtone: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('it handles SET_MICROPHONE', () => {
    expect(
      reducer(undefined, {
        type: actions.SET_MICROPHONE,
        deviceId: '1234'
      })
    ).toEqual({
      ...initialState,
      microphone: '1234'
    });
  });

  it('it handles SET_SPEAKER', () => {
    expect(
      reducer(undefined, {
        type: actions.SET_SPEAKER,
        deviceId: '1234'
      })
    ).toEqual({
      ...initialState,
      speaker: '1234'
    });
  });

  it('it handles SET_RINGTONE_SPEAKER', () => {
    expect(
      reducer(undefined, {
        type: actions.SET_RINGTONE_SPEAKER,
        deviceId: '1234'
      })
    ).toEqual({
      ...initialState,
      speakerRingtone: '1234'
    });
  });
});
