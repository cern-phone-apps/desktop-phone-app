import {routerReducer} from 'react-router-redux/reducer'
import {combineReducers} from 'redux'
import auth from './auth'
import userReducer from './user'
import sidebar from './sidebar'
import callsReducer from 'reducers/calls'

const rootReducer = combineReducers({
  auth,
  user: userReducer,
  sidebar,
  calls: callsReducer,
  router: routerReducer
})

export default rootReducer
