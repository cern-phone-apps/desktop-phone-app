import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {isAuthenticated} from 'login/reducers/auth'
import * as authActionCreators from 'login/actions/auth'
import * as meActionCreators from 'login/actions/me'
import LoginButton from 'login/components/LoginButton/LoginButton'

function mapStateToProps ({auth, router}) {
  return {
    loggedIn: isAuthenticated(auth),
    urlQuery: router.location.search
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...meActionCreators,
    ...authActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton)
