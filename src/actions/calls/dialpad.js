export const DISPLAY_DIALPAD = '@@dialpad/DISPLAY'
export const HIDE_DIALPAD = '@@dialpad/HIDE'

export function displayDialpad () {
  return {
    type: DISPLAY_DIALPAD
  }
}

export function hideDialpad () {
  return {
    type: HIDE_DIALPAD
  }
}
