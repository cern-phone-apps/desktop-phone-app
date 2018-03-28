import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreators from 'actions/auth'
import { ModalSettings } from 'components/settings'

function mapDispatchToProps (dispatch) {
  return bindActionCreators(authActionCreators, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(ModalSettings)
