import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'

import * as callActionCreators from 'calls/actions/call'
import {CallPage} from 'calls/screens'

function mapStateToProps ({calls}) {
  return {
    onCall: calls.call.onCall,
    calling: calls.call.calling,
    displayDialpad: calls.dialpad.display,
    connected: calls.connection.connected,
    searchValue: calls.search.value,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CallPage))
