import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Modal } from "semantic-ui-react";
import DisconnectAndLogoutButton from "calls/components/DisconnectAndLogoutButton";

/**
 * Button that displays the connection status
 * @param color (string) Color of the button
 * @param message
 * @param onClick
 * @returns {*}
 * @constructor
 */
const ConnectionIcon = ({ color, message, onClick }) => {
  return (
    <Button onClick={onClick} as={"a"} className={"flat"} title={message}>
      <Icon name={"circle"} color={color} />
    </Button>
  );
};

export class ConnectionStatusIcon extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    activeNumber: PropTypes.string.isRequired
  };

  inlineStyle = {
    modal: {
      marginTop: "0px !important",
      marginLeft: "auto",
      marginRight: "auto"
    }
  };

  render() {
    const { connected, activeNumber } = this.props;
    let color, message, callsMessage;
    if (connected) {
      color = "green";
      message = `You are connected with number ${activeNumber}`;
      callsMessage = `You are able to make and receive calls`;
    } else {
      color = "red";
      message = "You are not connected to TONE";
      callsMessage = `You won't be able to make or receive calls until you connect with a phone number of your choice`;
    }

    return (
      <Modal
        size={"tiny"}
        dimmer={"blurring"}
        style={this.inlineStyle.modal}
        closeIcon
        trigger={<ConnectionIcon color={color} message={message} />}
      >
        <Modal.Header>
          <Icon name={"circle"} color={color} /> {"Your connection status"}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>{message}</p>
            <p>{callsMessage}</p>
            {connected ? (
              <p>
                If you want to disconnect from TONE, you can use the following
                button to logout and login again.
              </p>
            ) : (
              ""
            )}
            <DisconnectAndLogoutButton color={'red'}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ConnectionStatusIcon;
