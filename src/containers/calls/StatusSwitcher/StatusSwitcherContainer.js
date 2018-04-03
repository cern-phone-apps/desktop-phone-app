import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'actions/calls/status'
import { StatusSwitcher } from 'components/calls'

function mapStateToProps ({calls}) {
  return {
    status: calls.status
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusSwitcher)
