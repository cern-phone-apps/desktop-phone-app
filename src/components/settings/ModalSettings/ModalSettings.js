import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Icon, Modal, Menu, Button, Header } from 'semantic-ui-react'
import {LanguageSettings} from 'components/settings'

class ModalSettings extends Component {
  static propTypes = {
    hideSidebarIfVisible: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  logoutUser = () => {
    this.props.logout()
  }

  render () {
    const {t} = this.props
    return (
      <Modal
        size={'mini'}
        dimmer={'blurring'}
        trigger={
          <Menu.Item onClick={this.props.hideSidebarIfVisible} name={'settings'}>
            <Icon name={'settings'}/>
            {'Settings'}
          </Menu.Item>
        }>
        <Modal.Header>{t('header')}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <LanguageSettings/>
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
