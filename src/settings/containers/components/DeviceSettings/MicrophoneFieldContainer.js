import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as devicesActionCreators from 'settings/actions/devices'
import MicrophoneField from 'settings/components/DeviceSettings/MicrophoneField'

function mapStateToProps ({devices}) {
  return {
    inputDevice: devices.microphone
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(devicesActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MicrophoneField)
