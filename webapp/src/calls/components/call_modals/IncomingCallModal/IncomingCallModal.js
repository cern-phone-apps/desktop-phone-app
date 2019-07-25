import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import PhoneRingingIcon from 'calls/components/PhoneRingingIcon/PhoneRingingIcon';
import { logMessage } from 'common/utils/logs';

import styles from './IncomingCallModal.css';

/**
 * Displays the incoming call button banner. It is displayed when the
 * CallingModal is hidden.
 * @param {*} param0
 */
const ModalTrigger = ({ onClick, callerName, callerNumber }) => (
  <div className="padded-item CallingMessage" onClick={onClick}>
    <Icon name="phone" /> {'Receiving a call'} from {callerName} ({callerNumber}
    )
  </div>
);

ModalTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
  callerName: PropTypes.string,
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
    <Button negative onClick={onClick} className="RejectCallButton">
      Reject
    </Button>
  );
}

function HangupAndPickupButton({ onClick }) {
  return (
    <Button color="green" onClick={onClick} className="RejectCallButton">
      Hangup and Answer
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
      className="AnswerCallButton"
    />
  );
}

AnswerButton.propTypes = { onClick: PropTypes.func };

function CallingModalContent({
  callerName,
  callerNumber,
  onClickReject,
  onClickAnswer,
  onClickHangupAndAnswer,
  onCall
}) {
  return (
    <React.Fragment>
      <Modal.Header>Receiving an incoming call</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="ui center aligned basic segment">
            <PhoneRingingIcon />
            <Header as="h3">{callerName}</Header>
            <Header as="h4">({callerNumber})</Header>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <RejectButton onClick={onClickReject} />
        {!onCall && <AnswerButton onClick={onClickAnswer} />}
        {onCall && <HangupAndPickupButton onClick={onClickHangupAndAnswer} />}
      </Modal.Actions>
    </React.Fragment>
  );
}

CallingModalContent.propTypes = {
  callerName: PropTypes.any,
  callerNumber: PropTypes.any,
  onClickReject: PropTypes.func,
  onClickAnswer: PropTypes.func,
  onClickHangupAndAnswer: PropTypes.func,
  onCall: PropTypes.bool.isRequired
};

/**
 * Modal displayed when there is an incoming call
 */
export class IncomingCallModal extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired,
    connected: PropTypes.bool.isRequired,
    receivingCall: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    callerName: PropTypes.string,
    callerNumber: PropTypes.string,
    setIsReceivingCall: PropTypes.func.isRequired // TODO Rename this function
  };

  state = {
    modalOpen: false,
    modalHidden: false,
    callerName: undefined
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // TODO Make a call to the backend to retrieve the owner of the number
  }

  /**
   * Action triggered when the modal is opened
   */
  onOpen = () => {
    logMessage('Opening calling modal');
    this.props.phoneService.playRingTone();
  };

  /**
   * Action triggered when the modal is closed
   */
  onClose = () => {
    logMessage('Closing calling modal');
    this.props.phoneService.stopRingTone();
    this.setState({ modalHidden: true });
  };

  /**
   * Action triggered when the reject call button is triggered
   */
  rejectIncomingCall = () => {
    const { phoneService } = this.props;
    this.setState({ modalHidden: false });
    phoneService.rejectIncomingCall();
  };

  /**
   * Action triggered when the reject call button is triggered
   */
  hangUpAndAnswerIncomingCall = () => {
    const { phoneService } = this.props;
    const hangUpdDefaultCall = true;
    phoneService.hangUpCurrentCallAction(hangUpdDefaultCall);
    phoneService.acceptIncomingCall();
  };

  /**
   * Action triggered when the answer button is clicked
   */
  answerCall = () => {
    const { phoneService } = this.props;
    this.setState({ modalHidden: false });
    phoneService.acceptIncomingCall();
  };

  render() {
    const {
      connected,
      receivingCall,
      callerName,
      callerNumber,
      onCall
    } = this.props;
    const { modalHidden } = this.state;

    let shouldDisplayBanner = false;
    if (modalHidden && receivingCall) {
      shouldDisplayBanner = true;
    }
    if (connected && receivingCall) {
      return (
        <Modal
          size="tiny"
          dimmer="blurring"
          open={receivingCall && !modalHidden}
          className={`${styles.CallingModal} CallingModal`}
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
            onCall={onCall}
            onClickReject={this.rejectIncomingCall}
            onClickAnswer={this.answerCall}
            onClickHangupAndAnswer={this.hangUpAndAnswerIncomingCall}
          />
        </Modal>
      );
    }
    return null;
  }
}

export default translate('settings')(IncomingCallModal);
