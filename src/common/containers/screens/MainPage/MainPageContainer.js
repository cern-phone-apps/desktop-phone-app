import { connect } from 'react-redux'
import { isAuthenticated } from 'login/reducers/auth'
import {withRouter} from 'react-router-dom'

import MainPage from 'common/screens/MainPage/MainPage'
import * as sidebarActionCreators from 'common/actions/sidebar'
import {bindActionCreators} from 'redux'

function mapStateToProps ({auth, common}) {
  return {
    errors: auth.errors,
    isAuthenticated: isAuthenticated(auth),
    loginInProgress: auth.loginInProgress,
    isVisible: common.sidebar.isVisible,
    contentDimmed: common.sidebar.contentDimmed,
    hideSidebar: common.sidebar.hideSidebar,
    notifications: common.notifications
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(sidebarActionCreators, dispatch)
}

export const MainPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage)

export default withRouter(MainPageContainer)
