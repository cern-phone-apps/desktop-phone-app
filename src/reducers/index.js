import {routerReducer} from 'react-router-redux/reducer'
import {combineReducers} from 'redux'
import auth from './auth'
import user from './user'
import sidebar from './sidebar'

const rootReducer = combineReducers({
  auth,
  user,
  sidebar,
  router: routerReducer
})

export default rootReducer
