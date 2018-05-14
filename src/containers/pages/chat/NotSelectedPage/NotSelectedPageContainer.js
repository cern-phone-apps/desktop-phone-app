import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {NotSelectedPage} from 'pages/chat/index'

function mapStateToProps (state) {
  return {}
}

export default withRouter(connect(
  mapStateToProps,
  null
)(NotSelectedPage))
