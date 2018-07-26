import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'calls/actions/status'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import StatusSwitcher from 'calls/components/StatusSwitcher/StatusSwitcher'


function mapStateToProps ({calls}) {
  return {
    status: calls.status,
    connected: calls.connection.connected,
    connecting: calls.connection.connecting,
    disconnecting: calls.connection.disconnecting
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default phoneService(connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusSwitcher))
