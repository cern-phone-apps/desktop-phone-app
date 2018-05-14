import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'actions/calls/call'
import { OnCallMessage } from 'components/calls/index'
import { withRouter } from 'react-router-dom'

function mapStateToProps ({calls}) {
  return {
    recipientName: calls.call.recipient.name,
    startTime: calls.call.recipient.startTime
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OnCallMessage))
