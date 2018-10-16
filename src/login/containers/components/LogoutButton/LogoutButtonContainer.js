import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import * as authActionCreators from 'login/actions/auth'
import LogoutButton from 'login/components/LogoutButton/LogoutButton'

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...authActionCreators
  }, dispatch)
}

export const LogoutButtonContainer = connect(
  null,
  mapDispatchToProps
)(LogoutButton)

export default withRouter(LogoutButtonContainer)
