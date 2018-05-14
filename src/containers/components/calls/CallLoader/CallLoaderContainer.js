import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { CallLoader } from 'components/calls/index'
import * as callActionCreators from 'actions/calls/call'

function mapStateToProps ({calls}) {
  return {
    recipientName: calls.call.recipient.name,
    recipientNumber: calls.call.recipient.number,
    calling: calls.call.calling
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallLoader)
