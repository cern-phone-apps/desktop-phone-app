import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'calls/actions/search'
import * as callActionCreators from 'calls/actions/call'
import * as dialpadActionCreators from 'calls/actions/dialpad'
import Caller from 'calls/components/Caller/Caller'

function mapStateToProps ({calls}) {
  return {
    userSelected: calls.search.userSelected,
    calling: calls.call.calling,
    onCall: calls.call.onCall,
    displayDialpad: calls.dialpad.display,
    activeNumber: calls.numbers.activeNumber,
    error: calls.call.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
    ...searchActionCreators,
    ...dialpadActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caller)
