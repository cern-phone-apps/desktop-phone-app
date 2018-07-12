import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as authActionCreators from 'login/actions/auth'
import {LogoutButton} from 'login/components/index'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...authActionCreators
  }, dispatch)
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(LogoutButton))
