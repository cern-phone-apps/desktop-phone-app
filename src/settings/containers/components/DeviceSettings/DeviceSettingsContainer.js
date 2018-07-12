import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as devicesActionCreators from 'settings/actions/devices'
import {DeviceSettings} from 'settings/components'

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
