import { combineReducers } from 'redux'
import call from './call'
import status from './status'
import search from './search'

const callsReducer = combineReducers({
  call,
  status,
  search
})

export default callsReducer
