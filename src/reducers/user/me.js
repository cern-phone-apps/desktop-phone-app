import * as me from 'actions/user/me'

const initialState = {}

export default (state = initialState, action) => {
  console.debug('echo reducer')
  switch (action.type) {
    case me.ME_SUCCESS:
      return {
        ...state,
        me: action.payload
      }
    default:
      return state
  }
}
