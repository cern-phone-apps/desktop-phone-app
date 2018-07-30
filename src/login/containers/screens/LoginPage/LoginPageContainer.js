import {connect} from 'react-redux'
import {isAuthenticated} from 'login/reducers/auth'
import {withRouter} from 'react-router-dom'
import LoginPage from 'login/screens/LoginPage/LoginPage'

function mapStateToProps ({auth}) {
  return {
    errors: auth.errors,
    isAuthenticated: isAuthenticated(),
    loginInProgress: auth.loginInProgress
  }
}

export default withRouter(connect(
  mapStateToProps
)(LoginPage))
