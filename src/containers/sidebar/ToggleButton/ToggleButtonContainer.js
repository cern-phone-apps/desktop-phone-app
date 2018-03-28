import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as sidebarActionCreators from 'actions/sidebar'
import {ToggleButton} from 'components/sidebar'

function mapStateToProps ({sidebar}) {
  return {
    isVisible: sidebar.isVisible,
    displayTime: sidebar.displayTime
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(sidebarActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleButton)
