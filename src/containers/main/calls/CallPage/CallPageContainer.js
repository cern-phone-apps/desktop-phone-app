import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {CallPage} from 'pages/main/calls'

function mapStateToProps ({calls}) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  null,
  null
)(CallPage))
