import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'actions/calls/status'
import { StatusSwitcher } from 'components/calls'
import {phoneService} from 'providers/PhoneProvider/PhoneProvider'


function mapStateToProps ({calls}) {
  return {
    status: calls.status,
    connected: calls.connection.connected,
    connecting: calls.connection.connecting
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default phoneService(connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusSwitcher))
