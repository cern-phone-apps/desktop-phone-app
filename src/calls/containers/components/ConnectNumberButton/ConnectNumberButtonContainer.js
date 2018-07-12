import { connect } from 'react-redux'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import {bindActionCreators} from 'redux'
import * as numbersActionCreators from 'calls/actions/numbers'
import {ConnectNumberButton} from 'calls/components'

function mapStateToProps ({calls}) {
  return {
    connecting: calls.connection.connecting,
    numbers: calls.numbers.numbers,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(numbersActionCreators, dispatch)
}

export default phoneService(connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectNumberButton))
