import {connect} from 'react-redux'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import {bindActionCreators} from 'redux'
import * as numbersActionCreators from 'calls/actions/numbers'
import ConnectNumberButton from 'calls/components/ConnectNumberButton/ConnectNumberButton'

function mapStateToProps ({calls}) {
  return {
    connecting: calls.connection.connecting,
    numbers: calls.numbers.numbers,
    error: calls.connection.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(numbersActionCreators, dispatch)
}

export const ConnectNumberButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectNumberButton)

export default phoneService(ConnectNumberButtonContainer)
