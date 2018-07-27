import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown, Form, Header} from 'semantic-ui-react'
import {translate} from 'react-i18next'
import DetectRTC from 'detectrtc'
import {changeAudioDestination, changeInputDevice, getUserDevices, stopStreams} from 'settings/utils/devices'


export function SpeakersField ({t, outputDevice, selectOutputDevice, hasSpeakers, devices}) {
  if (hasSpeakers) {
    return (<Form.Field>
      <label htmlFor="audioOutput">{t('devices.audioOutputLabel')}</label>
      {devices && <Dropdown
        id={'audioOutput'}
        selection
        defaultValue={outputDevice || 'default'}
        options={devices.filter((device) => (device.kind === 'audiooutput'))}
        onChange={(event, data) => selectOutputDevice(data.value)}
      />
      }
    </Form.Field>)
  } else {
    return (<div/>)
  }
}

export function InputDeviceField ({t, hasMicrophone, devices, inputDevice, selectInputDevice}) {
  if (hasMicrophone) {
    return <Form.Field>
      <label htmlFor="audioSource">{t('devices.audioInputLabel')}</label>
      {devices && <Dropdown
        id={'audioSource'}
        selection
        defaultValue={inputDevice || 'default'}
        options={devices.filter((device) => (device.kind === 'audioinput'))}
        onChange={(event, data) => selectInputDevice(data.value)}
      />
      }
    </Form.Field>
  } else {
    return <div/>
  }
}

export class DeviceSettings extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    setMicrophone: PropTypes.func.isRequired,
    setSpeaker: PropTypes.func.isRequired,
    inputDevice: PropTypes.string,
    outputDevice: PropTypes.string
  }

  state = {
    devices: [],
    hasMicrophone: false,
    hasSpeakers: false,
    isWebRTCSupported: false,
    isChrome: false
  }

  componentDidMount = () => {
    DetectRTC.load(() => {
      this.setState({
        hasMicrophone: DetectRTC.hasMicrophone,
        hasSpeakers: DetectRTC.hasSpeakers,
        isWebRTCSupported: DetectRTC.isWebRTCSupported,
        isChrome: DetectRTC.browser.isChrome
      })
      if (DetectRTC.isWebRTCSupported) {
        console.debug('Component will mount')
        getUserDevices().then(
          (devices) => this.setState({
            devices: devices
          }))
        changeInputDevice(this.props.inputDevice)
        changeAudioDestination(this.props.outputDevice)
      }
    })
  }

  componentWillUnmount () {
    stopStreams()
  }

  selectInputDevice = (value) => {
    this.props.setMicrophone(value)
    // this.stopStreams()
    changeInputDevice(value)
  }

  selectOutputDevice = (value) => {
    let audioElement = document.querySelector('audio')
    this.props.setSpeaker(value)
    changeAudioDestination(audioElement, value)
  }

  render () {
    const {t, outputDevice, inputDevice} = this.props
    const {hasSpeakers, devices, hasMicrophone} = this.state

    return (
      <div>
        <Header as={'h4'}>{t('devices.header')}</Header>
        <Form>

          <InputDeviceField
            t={t}
            outputDevice={inputDevice}
            selectOutputDevice={this.selectInputDevice()}
            hasSpeakers={hasMicrophone}
            devices={devices}
          />
          <SpeakersField
            t={t}
            outputDevice={outputDevice}
            selectOutputDevice={this.selectOutputDevice}
            hasSpeakers={hasSpeakers}
            devices={devices}
          />
          <Form.Field>
            {/*<audio id="gum-local" controls autoPlay/>*/}
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default translate('settings')(DeviceSettings)
