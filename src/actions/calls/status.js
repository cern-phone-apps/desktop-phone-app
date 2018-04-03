export const SET_AVAILABLE = '@@status/SET_AVAILABLE'
export const SET_INVISIBLE = '@@status/SET_INVISIBLE'
export const SET_DO_NOT_DISTURB = '@@status/SET_DO_NOT_DISTURB'

export function setUserAvailable () {
  console.debug('dispatching isCalling')
  return {
    type: SET_AVAILABLE
  }
}

export function setUserInvisible () {
  console.debug('dispatching isReceivingCall')
  return {
    type: SET_INVISIBLE
  }
}

export function setUserDoNotDisturb () {
  console.debug('dispatching isCalling')
  return {
    type: SET_DO_NOT_DISTURB
  }
}
