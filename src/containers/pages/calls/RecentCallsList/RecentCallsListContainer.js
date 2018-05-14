import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as callActionCreators from 'actions/calls/call'
import { RecentCallsList } from 'components/calls/index'

function mapStateToProps ({calls}) {
  return {
    onCall: calls.call.onCall,
    calling: calls.call.calling
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(callActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentCallsList))
