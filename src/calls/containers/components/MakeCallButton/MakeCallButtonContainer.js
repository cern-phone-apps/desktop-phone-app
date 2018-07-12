import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'calls/actions/call'
import {MakeCallButton} from 'calls/components'

function mapStateToProps ({calls}) {
  return {
    onCall: calls.call.onCall,
    calling: calls.call.calling,
    connected: calls.connection.connected,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeCallButton)