import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isAuthenticated } from 'reducers/auth'
import { bindActionCreators } from 'redux'

import * as authActionCreators from 'actions/auth'
import * as meActionCreators from 'actions/user/me'
import { RedirectPage } from 'pages/login'

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
