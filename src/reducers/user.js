import * as me from 'actions/user'

const initialState = {}

export default (state = initialState, action) => {
  console.debug('echo reducer')
  switch (action.type) {
    case me.ME_SUCCESS:
      return action.payload
    default:
      return state
  }
}