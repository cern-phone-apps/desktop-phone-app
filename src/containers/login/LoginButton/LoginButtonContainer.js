import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { isAuthenticated } from 'reducers/auth'
import * as authActionCreators from 'actions/auth'
import * as meActionCreators from 'actions/user/me'
import {LoginButton} from 'components/login'

function mapStateToProps (state) {
  return {
    isAuthenticated: isAuthenticated(state),
    urlQuery: state.router.location.search
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
