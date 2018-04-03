import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'actions/calls/call'
import { OnCallDetails } from 'components/calls'
import { withRouter } from 'react-router-dom'

function mapStateToProps ({calls}) {
  return {
    calling: calls.call.calling,
    onCall: calls.call.onCall,
    startTime: calls.call.recipient.startTime
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OnCallDetails))
