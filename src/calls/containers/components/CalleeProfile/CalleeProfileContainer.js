import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as callActionCreators from 'calls/actions/call'
import * as profileActionCreators from 'calls/actions/profile'
import {CalleeProfile} from 'calls/components'

function mapStateToProps ({calls}) {
  return {
    username: calls.search.user.username,
    profile: calls.profile.profile,
    fetching: calls.profile.fetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
      ...callActionCreators,
      ...profileActionCreators
    }
    , dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CalleeProfile))