import { combineReducers } from 'redux'
import call from './call'
import status from './status'
import search from './search'
import dialpad from './dialpad'
import connection from './connection'

const callsReducer = combineReducers({
  call,
  status,
  search,
  dialpad,
  connection
})

export default callsReducer
