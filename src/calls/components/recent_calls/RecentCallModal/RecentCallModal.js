import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import UserPhoneNumberButtonContainer from 'calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer';

function RecentCallDuration({ endTime, startTime }) {
  if (endTime && startTime) {
    return (
      <li style={{ margin: 10 }}>
        <Icon name="stopwatch" aria-label="Call duration icon" />
        {moment.duration(moment(endTime).diff(moment(startTime))).humanize()}
      </li>
    );
  }
  return null;
}

RecentCallDuration.propTypes = {
  endTime: PropTypes.number,
  startTime: PropTypes.number
};

RecentCallDuration.defaultProps = {
  endTime: null,
  startTime: null
};

function RecentCallTime({ endTime, incoming, missed }) {
  const message = `${incoming ? `Incoming` : `Outgoing`} and ${
    missed ? `missed` : `picked up`
  } call`;

  return (
    <li style={{ margin: 10 }}>
      <Icon
        aria-label={message}
        name={incoming ? 'arrow down' : 'arrow up'}
        color={missed ? 'red' : 'green'}
      />
      {moment(endTime).calendar()}
    </li>
  );
}

RecentCallTime.propTypes = {
  endTime: PropTypes.number.isRequired,
  incoming: PropTypes.bool.isRequired,
  missed: PropTypes.bool.isRequired
};

function RecentCallModal({ selectedCall, open, handleClose }) {
  if (!selectedCall) {
    return null;
  }

  const {
    name,
    phoneNumber,
    startTime,
    endTime,
    missed,
    incoming
  } = selectedCall;

  return (
    <Modal
      // closeIcon
      size="tiny"
      open={open}
      key={`${name}-${endTime}-modal`}
      onClose={handleClose}
      data-testid="RecentCallModal"
      closeIcon={<Icon aria-label="Close call details modal" name="close" />}
    >
      <Modal.Header>
        <Icon name="phone" color="blue" /> Call details
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Modal.Header></Modal.Header>
          <li style={{ margin: 10 }}>
            <Icon name="phone" />
            {phoneNumber}
          </li>
          <RecentCallDuration endTime={endTime} startTime={startTime} />
          <RecentCallTime
            endTime={endTime}
            incoming={incoming}
            missed={missed}
          />
        </Modal.Description>
        <UserPhoneNumberButtonContainer
          phoneNumber={phoneNumber}
          icon="phone"
          callBack={handleClose}
        />
      </Modal.Content>
    </Modal>
  );
}

RecentCallModal.propTypes = {
  selectedCall: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    missed: PropTypes.bool,
    incoming: PropTypes.bool
  }),
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

RecentCallModal.defaultProps = {
  selectedCall: null,
  open: false,
  handleClose: () => {}
};

export default RecentCallModal;
