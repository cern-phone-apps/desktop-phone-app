import { connect } from 'react-redux'
import { isAuthenticated } from 'reducers/auth'
import {withRouter} from 'react-router-dom'
import MainPage from 'pages/main/MainPage/MainPage'

function mapStateToProps ({auth}) {
  return {
    errors: auth.errors,
    isAuthenticated: isAuthenticated(auth),
    loginInProgress: auth.loginInProgress
  }
}

export default withRouter(connect(
  mapStateToProps
)(MainPage))
