import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from 'login/actions/auth'
import {ModalSettings} from 'settings/components'

function mapDispatchToProps (dispatch) {
  return bindActionCreators(authActionCreators, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(ModalSettings)
