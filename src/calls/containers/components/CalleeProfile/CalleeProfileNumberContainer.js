import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'calls/actions/call'
import * as searchActionCreators from 'calls/actions/search'
import {CalleeProfileNumber} from 'calls/components/CalleeProfile/CalleeProfileNumber'
import {phoneService} from 'calls/providers/PhoneProvider/PhoneProvider'

function mapStateToProps ({calls}) {
  return {
    unSelectUser: calls.search.unSelectUser,
    calling: calls.call.calling
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
    ...searchActionCreators
  }, dispatch)
}

export const CalleeProfileNumberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalleeProfileNumber)

export default phoneService(CalleeProfileNumberContainer)
