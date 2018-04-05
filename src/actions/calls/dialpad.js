export const TOGGLE_DIALPAD = '@@dialpad/TOGGLE'

export function toggleDialpad (newStatus) {
  return {
    newStatus,
    type: TOGGLE_DIALPAD
  }
}
