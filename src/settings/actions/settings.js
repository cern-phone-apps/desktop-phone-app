export const SET_REMEMBER_NUMBER = '@@settings/SET_REMEMBER_NUMBER';
export const SET_SEND_STATS = '@@settings/SET_SEND_STATS';
export const SET_ONLINE_STATUS = '@@settings/SET_ONLINE_STATUS';

export function setRememberNumber(value) {
  return {
    type: SET_REMEMBER_NUMBER,
    payload: value
  };
}

export function setSendStats(value) {
  return {
    type: SET_SEND_STATS,
    payload: value
  };
}

export function setOnlineStatus(value) {
  return {
    type: SET_ONLINE_STATUS,
    payload: value
  };
}
