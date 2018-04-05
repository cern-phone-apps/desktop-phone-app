import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux'

import * as callActionCreators from 'actions/calls/call'
import {CallPage} from 'pages/main/calls'

function mapStateToProps ({calls}) {
  return {
    onCall: calls.call.onCall,
    calling: calls.call.calling,
    displayDialpad: calls.dialpad.display
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CallPage))
