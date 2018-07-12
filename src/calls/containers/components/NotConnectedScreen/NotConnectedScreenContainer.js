import { connect } from 'react-redux'
import {NotConnectedScreen} from 'calls/components/index'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import {bindActionCreators} from 'redux'
import * as numbersActionCreators from 'calls/actions/numbers'

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

export default phoneService(connect(
  mapStateToProps,
  mapDispatchToProps
)(NotConnectedScreen))
