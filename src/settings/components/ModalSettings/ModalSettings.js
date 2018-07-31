import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Icon, Modal, Menu, Button, Header} from 'semantic-ui-react'

import DeviceSettings from 'settings/components/DeviceSettings/DeviceSettings'
import PersonalInfoContainer from 'settings/containers/components/PersonalInfo/PersonalInfoContainer'
import LanguageSettings from 'settings/components/LanguageSettings/LanguageSettings'

const ModalTrigger = ({onClick}) => {
  return (
    <Menu.Item onClick={onClick} name={'settings'}>
      <Icon name={'settings'}/>
      {'Settings'}
    </Menu.Item>
  )
}

/**
 * Modal to view and manage the application settings
 */
export class ModalSettings extends Component {
  static propTypes = {
    hideSidebarIfVisible: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  inlineStyle = {
    modal: {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }

  /**
   * Logs out the user from the application
   */
  logoutUser = () => {
    this.props.logout()
  }

  render () {
    const {t} = this.props
    // this fix is needed in order to center the modal on the screen. (Semantic UI bug)
    return (
      <Modal size={'small'} dimmer={'blurring'} style={this.inlineStyle.modal} closeIcon
             trigger={<ModalTrigger onClick={this.props.hideSidebarIfVisible}/>}>
        <Modal.Header>{t('header')}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <PersonalInfoContainer/>
            <hr/>
            <LanguageSettings/>
            <hr/>
            <DeviceSettings/>
            <hr/>
            <Header as={'h4'}>{t('dangerZoneHeader')}</Header>
            <Button color={'red'} onClick={this.logoutUser}>{t('logoutButtonText')}</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default translate('settings')(ModalSettings)
