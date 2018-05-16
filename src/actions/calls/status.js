export const SET_AVAILABLE = '@@status/SET_AVAILABLE'
export const SET_INVISIBLE = '@@status/SET_INVISIBLE'
export const SET_DO_NOT_DISTURB = '@@status/SET_DO_NOT_DISTURB'

export function setUserAvailable () {
  return {
    type: SET_AVAILABLE
  }
}

export function setUserInvisible () {
  return {
    type: SET_INVISIBLE
  }
}

export function setUserDoNotDisturb () {
  return {
    type: SET_DO_NOT_DISTURB
  }
}
