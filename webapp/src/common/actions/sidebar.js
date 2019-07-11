export const DISPLAY_SIDEBAR = '@@sidebar/DISPLAY_SIDEBAR';
export const IS_DISPLAYING = '@@sidebar/IS_DISPLAYING';
export const FINISHED_DISPLAYING = '@@sidebar/FINISHED_DISPLAYING';
export const HIDE_SIDEBAR = '@@sidebar/HIDE_SIDEBAR';

/**
 * Action triggered to display the sidebar
 * @returns {{type: string}} Action type
 */
export function displaySidebar() {
  return {
    type: DISPLAY_SIDEBAR
  };
}

/**
 * Action triggered to hide the sidebar
 * @returns {{type: string}} Action type
 */
export function hideSidebar() {
  return {
    type: HIDE_SIDEBAR
  };
}
