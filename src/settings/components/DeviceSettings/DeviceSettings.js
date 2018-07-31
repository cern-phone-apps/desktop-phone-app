import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Header} from 'semantic-ui-react'
import {translate} from 'react-i18next'
import SpeakersFieldContainer from 'settings/containers/components/DeviceSettings/SpeakersFieldContainer'
import MicrophoneFieldContainer from 'settings/containers/components/DeviceSettings/MicrophoneFieldContainer'


export class DeviceSettings extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props

    return (
      <div>
        <Header as={'h4'}>{t('devices.header')}</Header>
        <Form>
          <MicrophoneFieldContainer fieldLabel={t('devices.audioInputLabel')}
                                    fieldId={'audioSource'}
                                    fieldType={'audioinput'}
          />
          <SpeakersFieldContainer fieldLabel={t('devices.audioOutputLabel')}
                                  fieldId={'audioOutput'}
                                  fieldType={'audiooutput'}/>
          <Form.Field>
            {/*<audio id="gum-local" controls autoPlay/>*/}
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default translate('settings')(DeviceSettings)
