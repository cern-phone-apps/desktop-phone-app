import { combineReducers } from 'redux'
import call from './call'
import status from './status'
import search from './search'
import dialpad from './dialpad'

const callsReducer = combineReducers({
  call,
  status,
  search,
  dialpad
})

export default callsReducer
