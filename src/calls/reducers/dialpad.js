import * as dialpadActions from 'calls/actions/dialpad'

const initialState = {
  display: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case dialpadActions.TOGGLE_DIALPAD:
      return {
        ...state,
        display: action.newStatus
      }
    default:
      return state
  }
}

