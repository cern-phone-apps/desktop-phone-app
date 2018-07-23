import { combineReducers } from 'redux'
import call from './call'
import status from './status'
import search from './search'
import dialpad from './dialpad'
import connection from './connection'
import numbers from './numbers'
import recent from './recent'
import profile from './profile'

const callsReducer = combineReducers({
  call,
  status,
  search,
  dialpad,
  connection,
  numbers,
  recent,
  profile
})

export default callsReducer
