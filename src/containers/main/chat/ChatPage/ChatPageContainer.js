import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {ChatPage} from 'pages/main/chat'

function mapStateToProps ({calls}) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  null,
  null
)(ChatPage))
