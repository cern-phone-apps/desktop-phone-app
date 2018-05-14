import { connect } from 'react-redux'
import { DeviceSettings } from 'components/settings/index'
import { bindActionCreators } from 'redux'
import * as devicesActionCreators from 'actions/settings/devices'

function mapStateToProps ({devices}) {
  return {
    inputDevice: devices.microphone,
    outputDevice: devices.speaker
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(devicesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceSettings)
