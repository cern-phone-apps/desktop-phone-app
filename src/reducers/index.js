import {routerReducer} from 'react-router-redux/reducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  router: routerReducer
})

export default rootReducer
