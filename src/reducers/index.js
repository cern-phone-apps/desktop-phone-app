import {routerReducer} from 'react-router-redux/reducer'
import {combineReducers} from 'redux'
import auth from './auth'
import userReducer from './user'
import sidebar from './sidebar'
import callsReducer from 'reducers/calls'
import devices from 'reducers/settings/devices'

const rootReducer = combineReducers({
  auth,
  user: userReducer,
  sidebar,
  devices,
  calls: callsReducer,
  router: routerReducer
})

export default rootReducer
