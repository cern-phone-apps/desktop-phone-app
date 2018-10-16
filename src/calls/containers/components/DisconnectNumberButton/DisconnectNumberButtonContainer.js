import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'calls/actions/status'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import DisconnectNumberButton from 'calls/components/DisconnectNumberButton/DisconnectNumberButton'

function mapStateToProps ({calls}) {
  return {
    connected: calls.connection.connected,
    connecting: calls.connection.connecting,
    disconnecting: calls.connection.disconnecting
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export const DisconnectNumberButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectNumberButton)

export default phoneService(DisconnectNumberButtonContainer)
