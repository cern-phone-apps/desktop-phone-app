import { connect } from 'react-redux'
import {NotConnectedScreen} from 'components/calls'
import {phoneService} from 'providers/PhoneProvider/PhoneProvider'

function mapStateToProps ({calls}) {
  return {
    connecting: calls.connection.connecting,
    connected: calls.connection.connected,
    errors: calls.connection.errors
  }
}

export default phoneService(connect(
  mapStateToProps
)(NotConnectedScreen))
