import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'calls/actions/call'
import { withRouter } from 'react-router-dom'
import OnCallMessage from 'calls/components/OnCallMessage/OnCallMessage'

function mapStateToProps ({calls}) {
  return {
    recipient: calls.call.recipient,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OnCallMessage))
