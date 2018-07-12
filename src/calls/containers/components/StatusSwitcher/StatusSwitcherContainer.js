import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'calls/actions/status'
import { StatusSwitcher } from 'calls/components/index'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'


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
