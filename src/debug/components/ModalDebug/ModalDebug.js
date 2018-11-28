import PropTypes from "prop-types";
import React, { Component } from "react";
import { Menu, Modal, Icon, Button } from "semantic-ui-react";
import { logMessage } from "common/utils";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";

const ModalTrigger = ({ onClick }) => {
  return (
    <Menu.Item onClick={onClick} name={"bug"} className={'SidebarDebugButton'}>
      <Icon name={"bug"} />
      {"Debug"}
    </Menu.Item>
  );
};

ModalTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
};

class ModalDebug extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    hideSidebarIfVisible: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired
  };

  state = { open: false };

  close = () => this.setState({ open: false });

  receiveCall = () => {
    const { phoneService, hideSidebarIfVisible } = this.props;
    logMessage("Receiving call in some seconds");
    phoneService.eventHandler({
      name: "inviteReceived",
      data: {
        callerNumber: "555 444 333",
        callerName: "John Doe"
      }
    });
    this.close();
    hideSidebarIfVisible();
  };

  openModal = () => {
    const { hideSidebarIfVisible } = this.props;
    hideSidebarIfVisible();
    this.setState({ open: true });
  };

  render() {
    const { connected } = this.props;
    const { open } = this.state;
    // this fix is needed in order to center the modal on the screen. (Semantic UI bug)
    return (
      <Modal
        open={open}
        size={"small"}
        dimmer={"blurring"}
        closeIcon
        closeOnDimmerClick
        onClose={this.close}
        trigger={<ModalTrigger onClick={this.openModal}
        />}
        className={'ModalDebug'}
      >
        <Modal.Header>{"Debug"}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <p>{`This is the Ddebug content`}</p>
            <Button disabled={!connected} onClick={this.receiveCall} className={'ReceiveCallDebugButton'}>
              Receive a call
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

ModalDebug.propTypes = {};

export default phoneService(ModalDebug);
