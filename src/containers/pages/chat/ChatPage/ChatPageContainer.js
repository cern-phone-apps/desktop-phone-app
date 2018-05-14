import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {ChatPage} from 'pages/chat/index'

export default withRouter(connect(
  null,
  null
)(ChatPage))
