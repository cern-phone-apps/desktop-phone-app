import * as actions from './settings';

describe('settings actions', () => {
  it('creates an action on SET_REMEMBER_NUMBER', () => {
    const expectedAction = {
      type: actions.SET_REMEMBER_NUMBER,
      payload: true
    };
    expect(actions.setRememberNumber(true)).toEqual(expectedAction);
  });

  it('creates an action on SET_SEND_STATS', () => {
    const expectedAction = {
      type: actions.SET_SEND_STATS,
      payload: true
    };
    expect(actions.setSendStats(true)).toEqual(expectedAction);
  });

  it('creates an action on SET_ONLINE_STATUS', () => {
    const expectedAction = {
      type: actions.SET_ONLINE_STATUS,
      payload: true
    };
    expect(actions.setOnlineStatus(true)).toEqual(expectedAction);
  });
});
