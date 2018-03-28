import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {ChatPage} from 'pages/main/chat'

export default withRouter(connect(
  null,
  null
)(ChatPage))
