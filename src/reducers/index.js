import {routerReducer} from 'react-router-redux/reducer'
import {combineReducers} from 'redux'
import auth from './auth'
import user from './user'

const rootReducer = combineReducers({
  auth,
  user,
  router: routerReducer
})

export default rootReducer
