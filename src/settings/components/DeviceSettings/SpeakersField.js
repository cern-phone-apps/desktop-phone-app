import React from 'react'
import PropTypes from 'prop-types'
import {Dropdown, Form} from 'semantic-ui-react'
import {translate} from 'react-i18next'
import {changeAudioDestination} from 'settings/utils/devices'
import {DeviceField} from 'settings/components/DeviceSettings/DeviceField'
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
    t: PropTypes.func.isRequired,
    setSpeaker: PropTypes.func.isRequired,
    outputDevice: PropTypes.string
  }

  constructor () {
    super()
    this.state.hasSpeakers = false
  }

  componentDidMount = () => {
    DetectRTC.load(() => {
      this.setState({
        hasSpeakers: DetectRTC.hasSpeakers
      })
    })
    changeAudioDestination(this.props.outputDevice)
  }

  selectOutputDevice = (value) => {
    let audioElement = document.querySelector('audio')
    this.props.setSpeaker(value)
    changeAudioDestination(audioElement, value)
  }

  render () {
    const {t, outputDevice} = this.props
    const {hasSpeakers, devices} = this.state
    if (hasSpeakers) {
      return (<Form.Field>
        <label htmlFor="audioOutput">{t('devices.audioOutputLabel')}</label>
        {devices && <Dropdown
          id={'audioOutput'}
          selection
          defaultValue={outputDevice || 'default'}
          options={devices.filter((device) => (device.kind === 'audiooutput'))}
          onChange={(event, data) => this.selectOutputDevice(data.value)}
        />
        }
      </Form.Field>)
    } else {
      return (<Form.Field>No output devices found</Form.Field>)
    }
  }
}

export default translate('settings')(SpeakersField)
