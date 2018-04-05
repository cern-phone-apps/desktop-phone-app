import * as dialpadActions from 'actions/calls/dialpad'

const initialState = {
  display: false
}

const call = (state = initialState, action) => {
  switch (action.type) {
    case dialpadActions.DISPLAY_DIALPAD:
      return {
        ...state,
        display: true
      }
    case dialpadActions.HIDE_DIALPAD:
      return {
        ...state,
        display: false
      }
    default:
      return state
  }
}

export default call
