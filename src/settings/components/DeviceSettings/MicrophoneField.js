import PropTypes from 'prop-types'
import {changeInputDevice} from 'settings/utils/devices'
import DeviceField, {devicePropTypes} from 'settings/components/DeviceSettings/DeviceField'
import DetectRTC from 'detectrtc'

export class MicrophoneField extends DeviceField {
  static propTypes = {
    ...devicePropTypes,
    setMicrophone: PropTypes.func.isRequired,
    inputDevice: PropTypes.string
  }

  constructor () {
    super()
    this.state.hasDevice = false
    if (this.props && this.props.inputDevice) {
      this.state.device = this.props.inputDevice
    }
  }

  componentDidMount = () => {
    super.componentDidMount()
    DetectRTC.load(() => {
      this.setState({
        hasDevice: DetectRTC.hasMicrophone
      })
    })
    changeInputDevice(this.state.device)
  }

  selectDevice = (value) => {
    this.props.setMicrophone(value)
    // this.stopStreams()
    changeInputDevice(value)
  }
}

export default MicrophoneField
