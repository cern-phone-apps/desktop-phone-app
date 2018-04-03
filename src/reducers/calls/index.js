import { combineReducers } from 'redux'
import call from './call'
import status from './status'

const callsReducer = combineReducers({
  call,
  status
})

export default callsReducer