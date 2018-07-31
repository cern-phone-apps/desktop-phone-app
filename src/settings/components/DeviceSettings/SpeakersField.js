import PropTypes from 'prop-types'
import {changeAudioDestination} from 'settings/utils/devices'
import {DeviceField, devicePropTypes} from 'settings/components/DeviceSettings/DeviceField'
import DetectRTC from 'detectrtc'

/**
 * Displays a dropdown field with all the speakers available
 * @param t
 * @param outputDevice
 * @param selectOutputDevice
 * @param hasSpeakers
 * @param devices
 * @returns {*}
 * @constructor
 */
export class SpeakersField extends DeviceField {
  static propTypes = {
    ...devicePropTypes,
    setSpeaker: PropTypes.func.isRequired,
    outputDevice: PropTypes.string
  }

  constructor () {
    super()
    this.state.hasDevice = false
    if (this.props && this.props.outputDevice) {
      this.state.device = this.props.outputDevice
    }
  }

  componentDidMount = () => {
    super.componentDidMount()
    DetectRTC.load(() => {
      this.setState({
        hasDevice: DetectRTC.hasSpeakers
      })
    })
    changeAudioDestination(this.state.device)
  }

  selectDevice = (value) => {
    let audioElement = document.querySelector('audio')
    this.props.setSpeaker(value)
    changeAudioDestination(audioElement, value)
  }
}

export default SpeakersField
