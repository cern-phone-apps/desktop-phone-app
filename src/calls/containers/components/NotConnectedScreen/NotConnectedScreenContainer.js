import { connect } from 'react-redux'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import {bindActionCreators} from 'redux'
import * as numbersActionCreators from 'calls/actions/numbers'
import NotConnectedScreen from 'calls/components/NotConnectedScreen/NotConnectedScreen'

function mapStateToProps ({calls}) {
  return {
    connecting: calls.connection.connecting,
    connected: calls.connection.connected,
    errors: calls.connection.errors,
    numbers: calls.numbers.numbers,
    numbersError: calls.numbers.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(numbersActionCreators, dispatch)
}

export const NotConnectedScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotConnectedScreen)

export default phoneService(NotConnectedScreenContainer)
