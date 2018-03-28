import * as sidebarActions from 'actions/sidebar'

const initialState = {
  isVisible: false,
  isDisplaying: false,
  contentDimmed: false,
  displayTime: 500
}

const sidebar = (state = initialState, action) => {
  console.debug(`Calling sidebar reducer: ${action.type}`)
  switch (action.type) {
    case sidebarActions.DISPLAY_SIDEBAR:
    case sidebarActions.IS_DISPLAYING:
      return {
        ...state,
        isVisible: true,
        contentDimmed: true,
        isDisplaying: true
      }

    case sidebarActions.FINISHED_DISPLAYING:
      console.log(state)
      return {
        ...state,
        isDisplaying: false
      }

    case sidebarActions.HIDE_SIDEBAR:
      console.log(state)
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
