import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as authActionCreators from 'actions/auth'
import {LogoutButton} from 'components/login/index'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...authActionCreators
  }, dispatch)
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(LogoutButton))
