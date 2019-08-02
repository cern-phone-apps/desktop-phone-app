import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import moment from 'moment';
import UserPhoneNumberButtonContainer from 'calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer';

function RecentCallDuration({ endTime, startTime }) {
  if (endTime && startTime) {
    return (
      <li style={{ margin: 10 }}>
        <Icon name="stopwatch" />
        {moment.duration(moment(endTime).diff(moment(startTime))).humanize()}
      </li>
    );
  }
  return null;
}

function RecentCallTime({ endTime, incoming, missed }) {
  return (
    <li style={{ margin: 10 }}>
      <Icon
        name={incoming ? 'arrow down' : 'arrow up'}
        color={missed ? 'red' : 'green'}
      />
      {moment(endTime).calendar()}
    </li>
  );
}

export class RecentCallModal extends Component {
  inlineStyle = {
    modal: {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };

  render() {
    const {
      name,
      phoneNumber,
      startTime,
      endTime,
      missed,
      incoming
    } = this.props.recentCall;
    const { trigger } = this.props;

    return (
      <Modal size="tiny" trigger={trigger} key={`${name}-${endTime}-modal`}>
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
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default RecentCallModal;
