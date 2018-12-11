import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Icon, Modal, Menu, Header } from "semantic-ui-react";

import DeviceSettings from "settings/components/DeviceSettings/DeviceSettings";
import PersonalInfoContainer from "settings/components/PersonalInfo/PersonalInfoContainer";
import AppInfo from "settings/components/AppInfo/AppInfo";
import NotificationsSettings from "settings/components/NotificationsSettings/NotificationsSettings";
import LogoutButtonContainer from "login/components/LogoutButton/LogoutButtonContainer";
import CallsSettings from "settings/components/CallsSettings/CallsSettings";

const ModalTrigger = ({ onClick }) => {
  return (
    <Menu.Item onClick={onClick} name={"settings"} className={'SidebarSettingsButton'}>
      <Icon name={"settings"} />
      {"Settings"}
    </Menu.Item>
  );
};

ModalTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
};

/**
 * Modal to view and manage the application settings
 */
export class SettingsModal extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    hideSidebarIfVisible: PropTypes.func.isRequired
  };

  render() {
    const { t } = this.props;
    // this fix is needed in order to center the modal on the screen. (Semantic UI bug)
    return (
      <Modal
        size={"small"}
        dimmer={"blurring"}
        closeIcon
        trigger={<ModalTrigger onClick={this.props.hideSidebarIfVisible} />}
        className={'ModalSettings'}
      >
        <Modal.Header>{t("header")}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <PersonalInfoContainer />
            <hr />
            <CallsSettings />
            <hr />
            <DeviceSettings />
            <hr />
            <NotificationsSettings />
            <hr />
            <Header as={"h4"}>{t("dangerZoneHeader")}</Header>
            <LogoutButtonContainer color={"red"} />
            <hr />
            <AppInfo />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate("settings")(SettingsModal);
