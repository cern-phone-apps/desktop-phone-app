import * as statusActions from 'actions/calls/status'

const initialState = 'available'

const user = (state = initialState, action) => {
  console.debug(`Calling call reducer: ${action.type}`)
  switch (action.type) {
    case statusActions.SET_AVAILABLE:
      return 'available'
    case statusActions.SET_INVISIBLE:
      return 'invisible'
    case statusActions.SET_DO_NOT_DISTURB:
      return 'do_not_disturb'
    default:
      return state
  }
}

export default user
