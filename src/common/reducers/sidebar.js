import * as sidebarActions from 'common/actions/sidebar'

const initialState = {
  isVisible: false,
  isDisplaying: false,
  contentDimmed: false,
  displayTime: 500
}

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
    case sidebarActions.IS_DISPLAYING:
      return {
        ...state,
        isVisible: true,
        contentDimmed: true,
        isDisplaying: true
      }

    case sidebarActions.FINISHED_DISPLAYING:
      return {
        ...state,
        isDisplaying: false
      }

    case sidebarActions.HIDE_SIDEBAR:
      if (state.isDisplaying === false) {
        return {
          ...state,
          isVisible: false,
          contentDimmed: false
        }
      }
      return {
        ...state
      }
    default:
      return state
  }
}

export default sidebar
