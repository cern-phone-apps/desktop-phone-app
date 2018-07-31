import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as callActionCreators from 'calls/actions/call'
import * as recentActionCreators from 'calls/actions/recent'
import OnCallDetails from 'calls/components/OnCallDetails/OnCallDetails'

function mapStateToProps ({calls}) {
  return {
    calling: calls.call.calling,
    onCall: calls.call.onCall,
    startTime: calls.call.recipient.startTime,
    recipient: calls.call.recipient,
    receivingCall: calls.call.receivingCall
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
    ...recentActionCreators
  }, dispatch)
}

export const OnCallDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnCallDetails)

export default withRouter(OnCallDetailsContainer)
