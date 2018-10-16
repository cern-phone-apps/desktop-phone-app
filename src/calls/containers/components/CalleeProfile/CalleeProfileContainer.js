import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as callActionCreators from 'calls/actions/call'
import * as profileActionCreators from 'calls/actions/profile'
import * as searchActionCreators from 'calls/actions/search'
import {CalleeProfile} from 'calls/components/CalleeProfile/CalleeProfile'

function mapStateToProps ({calls}) {
  return {
    username: calls.search.user.username,
    profile: calls.profile.profile,
    fetching: calls.profile.fetching
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
      ...callActionCreators,
      ...profileActionCreators,
      ...searchActionCreators
    }
    , dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalleeProfile)
