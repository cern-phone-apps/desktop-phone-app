import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as callActionCreators from 'calls/actions/call'
import {CallLoader} from 'calls/components'

function mapStateToProps ({calls}) {
  return {
    recipientName: calls.call.recipient.name,
    phoneNumber: calls.call.recipient.number,
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
