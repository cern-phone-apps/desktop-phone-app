import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {RecentCallList} from 'calls/components'

function mapStateToProps ({calls}) {
  return {
    recentCalls: calls.recent.recentCalls
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(RecentCallList))
