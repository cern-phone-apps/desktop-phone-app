import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import * as callActionCreators from 'calls/actions/call'
import CallingModal from 'calls/components/CallingModal/CallingModal'

function mapStateToProps ({calls}) {
  return {
    connected: calls.connection.connected
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export const CallingModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallingModal)

export default phoneService(CallingModalContainer)
