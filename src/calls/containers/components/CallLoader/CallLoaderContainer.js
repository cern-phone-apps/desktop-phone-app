import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as callActionCreators from 'calls/actions/call'
import CallLoader from 'calls/components/CallLoader/CallLoader'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'

function mapStateToProps ({calls}) {
  return {
    recipientName: calls.call.recipient.name,
    phoneNumber: calls.call.recipient.phoneNumber,
    calling: calls.call.calling
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export const CallLoaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallLoader)

export default phoneService(CallLoaderContainer)
