import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as sidebarActionCreators from 'common/actions/sidebar'
import ToggleButton from 'common/components/ToggleButton/ToggleButton'

function mapStateToProps ({common}) {
  return {
    isVisible: common.sidebar.isVisible,
    displayTime: common.sidebar.displayTime
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(sidebarActionCreators, dispatch)
}

const ToggleButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleButton)

export default ToggleButtonContainer
