import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Icon, Modal, Menu, Button, Header} from 'semantic-ui-react'

import DeviceSettings from 'settings/components/DeviceSettings/DeviceSettings'
import PersonalInfoContainer from 'settings/containers/components/PersonalInfo/PersonalInfoContainer'
import LanguageSettings from 'settings/components/LanguageSettings/LanguageSettings'

/**
 * Modal to view and manage the application settings
 */
class ModalSettings extends Component {
  static propTypes = {
    hideSidebarIfVisible: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
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
    const inlineStyle = {
      modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    }
    return (
      <Modal
        size={'small'}
        dimmer={'blurring'}
        style={inlineStyle.modal}
        closeIcon
        trigger={
          <Menu.Item onClick={this.props.hideSidebarIfVisible} name={'settings'}>
            <Icon name={'settings'}/>
            {'Settings'}
          </Menu.Item>
        }>
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
