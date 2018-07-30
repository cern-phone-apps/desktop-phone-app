import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {isAuthenticated} from 'login/reducers/auth'
import {bindActionCreators} from 'redux'

import * as authActionCreators from 'login/actions/auth'
import * as meActionCreators from 'login/actions/me'
import RedirectPage from 'login/screens/RedirectPage/RedirectPage'

function mapStateToProps ({errors, auth, router}) {
  return {
    errors: errors,
    isAuthenticated: isAuthenticated(auth),
    urlQuery: router.location.search
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...meActionCreators,
    ...authActionCreators
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectPage))
