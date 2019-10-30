import * as actions from './devices';

describe('devices actions', () => {
  it('creates an action on SET_MICROPHONE', () => {
    const expectedAction = {
      type: actions.SET_MICROPHONE,
      deviceId: '1234'
    };
    expect(actions.setMicrophone('1234')).toEqual(expectedAction);
  });

  it('creates an action on SET_SPEAKER', () => {
    const expectedAction = {
      type: actions.SET_SPEAKER,
      deviceId: '1234'
    };
    expect(actions.setSpeaker('1234')).toEqual(expectedAction);
  });

  it('creates an action on SET_RINGTONE_SPEAKER', () => {
    const expectedAction = {
      type: actions.SET_RINGTONE_SPEAKER,
      deviceId: '1234'
    };
    expect(actions.setSpeakerRingtone('1234')).toEqual(expectedAction);
  });
});
