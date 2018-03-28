export const DISPLAY_SIDEBAR = '@@sidebar/DISPLAY_SIDEBAR'
export const IS_DISPLAYING = '@@sidebar/IS_DISPLAYING'
export const FINISHED_DISPLAYING = '@@sidebar/FINISHED_DISPLAYING'
export const HIDE_SIDEBAR = '@@sidebar/HIDE_SIDEBAR'

export function displaySidebar () {
  console.debug('dispatching displaySidebar')
  return {
    type: DISPLAY_SIDEBAR
  }
}

export function displayingSidebar () {
  console.debug('dispatching displaySidebar')
  return {
    type: IS_DISPLAYING
  }
}

export function finishedDisplayingSidebar () {
  console.debug('dispatching finishedDisplayingSidebar')
  return {
    type: FINISHED_DISPLAYING
  }
}

export function hideSidebar () {
  console.debug('dispatching hideSidebar')
  return {
    type: HIDE_SIDEBAR
  }
}
