import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "react-i18next";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import PhoneRingingIcon from "calls/components/PhoneRingingIcon/PhoneRingingIcon";
import { logMessage } from "common/utils";

import styles from "./CallingModal.css";

/**
 * Displays the incoming call button banner. It is displayed when the
 * CallingModal is hidden.
 * @param {*} param0
 */
const ModalTrigger = ({ onClick, callerName, callerNumber }) => {
  return (
    <div className={"padded-item CallingMessage"} onClick={onClick}>
      <Icon name={"phone"} /> {"Receiving a call"} from {callerName} (
      {callerNumber})
    </div>
  );
};

ModalTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
  callerName: PropTypes.string.isRequired,
  callerNumber: PropTypes.string.isRequired
};

/**
 * Reject Button
 * @param onClick Click action
 * @returns {*}
 * @constructor
 */
function RejectButton({ onClick }) {
  return (
    <Button negative onClick={onClick}>
      Reject
    </Button>
  );
}

RejectButton.propTypes = { onClick: PropTypes.func };

/**
 * Answer Button
 * @param onClick Click action
 * @returns {*}
 * @constructor
 */
function AnswerButton({ onClick }) {
  return (
    <Button
      positive
      onClick={onClick}
      icon="phone"
      labelPosition="right"
      content="Answer"
    />
  );
}

AnswerButton.propTypes = { onClick: PropTypes.func };

function CallingModalContent({
  callerName,
  callerNumber,
  onClickReject,
  onClickAnswer
}) {
  return (
    <>
      <Modal.Header>{"Receiving an incoming call"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="ui center aligned basic segment">
            <PhoneRingingIcon />
            <Header as={"h3"}>{callerName}</Header>
            <Header as={"h4"}>({callerNumber})</Header>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <RejectButton onClick={onClickReject} />
        <AnswerButton onClick={onClickAnswer} />
      </Modal.Actions>
    </>
  );
}

CallingModalContent.propTypes = {
  callerName: PropTypes.any,
  callerNumber: PropTypes.any,
  onClick: PropTypes.func,
  onClick1: PropTypes.func
};

/**
 * Modal displayed when there is an incoming call
 */
export class CallingModal extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired,
    connected: PropTypes.bool.isRequired,
    receivingCall: PropTypes.bool.isRequired,
    callerName: PropTypes.string,
    callerNumber: PropTypes.string,
    isReceivingCall: PropTypes.func.isRequired, // TODO Rename this function
    rejectOutgoingCall: PropTypes.func.isRequired,
  };

  state = { modalOpen: false, modalHidden: false };

  /**
   * Action triggered when the modal is opened
   */
  onOpen = () => {
    logMessage("Opening calling modal");
    this.props.phoneService.playRingTone();
  };

  /**
   * Action triggered when the modal is closed
   */
  onClose = () => {
    logMessage("Closing calling modal");
    this.props.phoneService.stopRingTone();
    this.setState({ modalHidden: true });
  };

  /**
   * Action triggered when the reject call button is triggered
   */
  rejectIncomingCall = () => {
    this.setState({ modalHidden: false });
    this.props.phoneService.rejectIncomingCall();
  };

  /**
   * Action triggered when the answer button is clicked
   */
  answerCall = () => {
    this.setState({ modalHidden: false });
    this.props.phoneService.acceptIncomingCall();
  };

  render() {
    const { connected, receivingCall, callerName, callerNumber } = this.props;
    const { modalHidden } = this.state;

    let shouldDisplayBanner = false;
    if (modalHidden && receivingCall) {
      shouldDisplayBanner = true;
    }

    if (connected && receivingCall) {
      return (
        <Modal
          size={"tiny"}
          dimmer={"blurring"}
          open={receivingCall && !modalHidden}
          className={styles.CallingModal}
          closeIcon
          onOpen={this.onOpen}
          onClose={this.onClose}
          trigger={
            shouldDisplayBanner && (
              <ModalTrigger
                callerName={callerName}
                callerNumber={callerNumber}
                className={styles.CallingMessage}
                onClick={() => this.setState({ modalHidden: false })}
              />
            )
          }
        >
          <CallingModalContent
            callerName={callerName}
            callerNumber={callerNumber}
            onClickReject={this.rejectIncomingCall}
            onClickAnswer={this.answerCall}
          />
        </Modal>
      );
    } else {
      return "";
    }
  }
}

export default translate("settings")(CallingModal);
