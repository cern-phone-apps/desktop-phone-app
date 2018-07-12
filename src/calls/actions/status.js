export const SET_AVAILABLE = '@@status/SET_AVAILABLE'
export const SET_INVISIBLE = '@@status/SET_INVISIBLE'
export const SET_DO_NOT_DISTURB = '@@status/SET_DO_NOT_DISTURB'

/**
 * Action that triggers a change of status of visibility for the user to available
 * @returns {{type: string}} The action dict
 */
export function setUserAvailable () {
  return {
    type: SET_AVAILABLE
  }
}

/**
 * Action that triggers a change of status of visibility for the user to invisible
 * @returns {{type: string}} The action dict
 */
export function setUserInvisible () {
  return {
    type: SET_INVISIBLE
  }
}

/**
 * Action that triggers a change of status of visibility for the user to do not disturb
 * @returns {{type: string}} The action dict
 */
export function setUserDoNotDisturb () {
  return {
    type: SET_DO_NOT_DISTURB
  }
}
