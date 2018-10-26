import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'calls/actions/status'
import { phoneService } from 'calls/providers/PhoneProvider/PhoneProvider'
import ModalDebug from './ModalDebug'

function mapStateToProps ({ calls }) {
  return {
    connected: calls.connection.connected,
    connecting: calls.connection.connecting,
    disconnecting: calls.connection.disconnecting
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export const ModalDebugConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDebug)

export default phoneService(ModalDebugConnected)
