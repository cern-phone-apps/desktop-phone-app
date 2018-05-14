import { connect } from 'react-redux'
import { isAuthenticated } from 'reducers/auth'
import {withRouter} from 'react-router-dom'

import MainPage from 'pages/MainPage/MainPage'
import * as sidebarActionCreators from 'actions/sidebar'
import {bindActionCreators} from 'redux'

function mapStateToProps ({auth, sidebar}) {
  return {
    errors: auth.errors,
    isAuthenticated: isAuthenticated(auth),
    loginInProgress: auth.loginInProgress,
    isVisible: sidebar.isVisible,
    contentDimmed: sidebar.contentDimmed,
    hideSidebar: sidebar.hideSidebar
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(sidebarActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage))
