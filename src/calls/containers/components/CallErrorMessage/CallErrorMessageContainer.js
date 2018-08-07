import { connect } from 'react-redux'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import CallErrorMessage from 'calls/components/CallErrorMessage/CallErrorMessage'

function mapStateToProps ({calls}) {
  return {
    callError: calls.call.error,
    connectionError: calls.connection.error,
    numbersError: calls.numbers.error
  }
}

export const CallErrorMessageContainer = connect(
  mapStateToProps,
  null
)(CallErrorMessage)

export default phoneService(CallErrorMessageContainer)
