export const SET_REMEMBER_NUMBER = '@@settings/SET_REMEMBER_NUMBER';

export function setRememberNumber(value) {
  return {
    type: SET_REMEMBER_NUMBER,
    payload: value
  };
}
