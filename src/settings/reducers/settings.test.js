import reducer from './settings';
import * as actions from '../actions/settings';

describe('dialpad reducer', () => {
  const initialState = {
    rememberNumber: false,
    sendStats: true,
    onlineStatus: 'offline',
    error: {}
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('it handles SET_REMEMBER_NUMBER', () => {
    const value = true;

    expect(
      reducer(undefined, {
        type: actions.SET_REMEMBER_NUMBER,
        payload: value
      })
    ).toEqual({
      ...initialState,
      rememberNumber: true
    });
  });

  it('it handles SET_SEND_STATS', () => {
    const sendStats = true;

    expect(
      reducer(undefined, {
        type: actions.SET_SEND_STATS,
        payload: sendStats
      })
    ).toEqual({
      ...initialState,
      sendStats: true
    });
  });

  it('it handles SET_ONLINE_STATUS', () => {
    const onlineStatus = true;

    expect(
      reducer(undefined, {
        type: actions.SET_ONLINE_STATUS,
        payload: onlineStatus
      })
    ).toEqual({
      ...initialState,
      onlineStatus: true
    });
  });
});
