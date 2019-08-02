import * as sidebarActions from 'common/actions/sidebar';

const initialState = {
  isVisible: false
};

/**
 * Handles the state of the sidebar.
 *
 * @param state Current state of the sidebar before changes
 * @param action Action that will be triggered
 * @returns {
 * {isVisible: boolean,
 * isDisplaying: boolean,
 * contentDimmed: boolean,
 * displayTime: number}} A dict with the new status of the sidebar
 */
const sidebar = (state = initialState, action) => {
  switch (action.type) {
    /**
     * If the sidebar wants to be displayed or is being displayed.
     */
    case sidebarActions.DISPLAY_SIDEBAR:
      return {
        ...state,
        isVisible: true
      };
    case sidebarActions.HIDE_SIDEBAR:
      return {
        ...state,
        isVisible: false
      };
    default:
      return state;
  }
};

export default sidebar;
