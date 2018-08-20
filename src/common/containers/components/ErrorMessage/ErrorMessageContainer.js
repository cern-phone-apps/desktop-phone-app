import { connect } from 'react-redux'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import ErrorMessage from 'common/components/ErrorMessage/ErrorMessage'

function mapStateToProps ({calls, auth}) {
  return {
    errors: [
      calls.call.error,
      calls.connection.error,
      calls.numbers.error,
      auth.error,
    ]
  }
}

export const ErrorMessageContainer = connect(
  mapStateToProps,
  null
)(ErrorMessage)

export default phoneService(ErrorMessageContainer)
