import React from 'react'
import PropTypes from 'prop-types'
import {Dropdown, Form} from 'semantic-ui-react'
import {translate} from 'react-i18next'
import {changeInputDevice} from 'settings/utils/devices'
import DeviceField from 'settings/components/DeviceSettings/DeviceField'
import DetectRTC from 'detectrtc'


export class MicrophoneField extends DeviceField {

  static propTypes = {
    t: PropTypes.func.isRequired,
    setMicrophone: PropTypes.func.isRequired,
    inputDevice: PropTypes.string
  }

  constructor () {
    super()
    this.state.hasMicrophone = false
  }

  componentDidMount = () => {
    super.componentDidMount()
    DetectRTC.load(() => {
      this.setState({
        hasMicrophone: DetectRTC.hasMicrophone
      })
    })
    changeInputDevice(this.props.inputDevice)
  }

  selectInputDevice = (value) => {
    this.props.setMicrophone(value)
    // this.stopStreams()
    changeInputDevice(value)
  }

  render () {
    const {t, inputDevice} = this.props
    const {hasMicrophone, devices} = this.state
    if (hasMicrophone) {
      return <Form.Field>
        <label htmlFor="audioSource">{t('devices.audioInputLabel')}</label>
        {devices && <Dropdown
          id={'audioSource'}
          selection
          defaultValue={inputDevice || 'default'}
          options={devices.filter((device) => (device.kind === 'audioinput'))}
          onChange={(event, data) => this.selectInputDevice(data.value)}
        />
        }
      </Form.Field>
    } else {
      return <Form.Field>No input devices found</Form.Field>
    }
  }
}

export default translate('settings')(MicrophoneField)
