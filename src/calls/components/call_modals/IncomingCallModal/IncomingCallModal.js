import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import PhoneRingingIcon from 'calls/components/PhoneRingingIcon/PhoneRingingIcon';
import { logMessage } from 'common/utils/logs';
import DetectRTC from 'detectrtc';

import styles from './IncomingCallModal.css';

/**
 * Displays the incoming call button banner. It is displayed when the
 * CallingModal is hidden.
 * @param {*} param0
 */
const ModalTrigger = ({ onClick, callerName, callerNumber }) => (
  <div
    className="padded-item CallingMessage"
    onClick={onClick}
    aria-label="incoming call banner"
    name="incomingcallbanner"
  >
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
function AnswerButton({ onClick, loading }) {
  return (
    <Button
      positive
      onClick={onClick}
      icon="phone"
      labelPosition="right"
      content="Answer"
      className="AnswerCallButton"
      loading={!!loading}
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
  const [answerLoading, setAnswerLoading] = useState(0);
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
        {!onCall && (
          <AnswerButton
            onClick={() => {
              if (onClickAnswer()) setAnswerLoading(1);
            }}
            loading={answerLoading}
          />
        )}
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
export function IncomingCallModal({
  connected,
  receivingCall,
  callerName,
  callerNumber,
  onCall,
  phoneService
}) {
  const [modalHidden, setmodalHidden] = useState(0);
  const [hasMic, sethasMic] = useState(false);
  const [hasSpeaker, setHasSpeaker] = useState(false);

  useEffect(() => {
    DetectRTC.load(() => {
      sethasMic(DetectRTC.hasMicrophone);
      setHasSpeaker(DetectRTC.hasSpeakers);
    });
  }, []);

  /**
   * Action triggered when the modal is opened
   */
  const onOpen = () => {
    logMessage('Opening calling modal');
    phoneService.playRingTone();
  };

  /**
   * Action triggered when the modal is closed
   */
  const onClose = () => {
    logMessage('Closing calling modal');
    phoneService.stopRingTone();
    setmodalHidden(true);
  };

  /**
   * Action triggered when the reject call button is triggered
   */
  const rejectIncomingCall = () => {
    setmodalHidden(false);
    phoneService.rejectIncomingCall();
  };

  /**
   * Action triggered when the reject call button is triggered
   */
  const hangUpAndAnswerIncomingCall = () => {
    const hangUpdDefaultCall = true;
    phoneService.hangUpCurrentCallAction(hangUpdDefaultCall);
    phoneService.acceptIncomingCall();
  };

  /**
   * Action triggered when the answer button is clicked
   */
  const answerCall = async () => {
    if (hasMic && hasSpeaker) {
      setmodalHidden(false);
      phoneService.acceptIncomingCall();
      return true;
    }
    // eslint-disable-next-line no-alert
    alert(
      'There are no input/output devices.\nPlease connect at least one speaker and one microphone to perform phone calls.'
    );
    return false;
  };

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
        closeIcon={<Icon aria-label="Close incoming call modal" name="close" />}
        onOpen={onOpen}
        onClose={onClose}
        trigger={
          shouldDisplayBanner && (
            <ModalTrigger
              callerName={callerName}
              callerNumber={callerNumber}
              className={styles.CallingMessage}
              onClick={() => setmodalHidden(false)}
            />
          )
        }
      >
        <CallingModalContent
          callerName={callerName}
          callerNumber={callerNumber}
          onCall={onCall}
          onClickReject={rejectIncomingCall}
          onClickAnswer={answerCall}
          onClickHangupAndAnswer={hangUpAndAnswerIncomingCall}
        />
      </Modal>
    );
  }
  return null;
}

IncomingCallModal.propTypes = {
  t: PropTypes.func.isRequired,
  phoneService: PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired,
  receivingCall: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired,
  callerName: PropTypes.string,
  callerNumber: PropTypes.string,
  setIsReceivingCall: PropTypes.func.isRequired // TODO Rename this function
};

export default translate('settings')(IncomingCallModal);
