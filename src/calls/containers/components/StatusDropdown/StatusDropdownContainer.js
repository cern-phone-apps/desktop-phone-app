import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as callActionCreators from 'calls/actions/status'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'
import {StatusDropdown} from 'calls/components/StatusDropdown/StatusDropdown'


function mapStateToProps ({calls}) {
  return {
    status: calls.status,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export const StatusDropdownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusDropdown)

export default phoneService(StatusDropdownContainer)
