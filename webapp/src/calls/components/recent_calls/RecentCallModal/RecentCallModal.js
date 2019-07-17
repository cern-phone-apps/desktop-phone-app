import React, { Component } from 'react';
import { Modal, Header, Icon } from 'semantic-ui-react';
import moment from "moment";
import UserPhoneNumberButtonContainer from 'calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer';

export class RecentCallModal extends Component {
  inlineStyle = {
    modal: {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };
  
  getDuration(endTime, startTime) {
    if (endTime && startTime)
      return <li style={{ margin: 10 }}><Icon name="stopwatch"/>{moment.duration(moment(endTime).diff(moment(startTime))).humanize()}</li>;          
  }

  getTime(endTime, incoming, missed) {
    let Way;

    Way = <Icon name={(incoming) ? "arrow down" : "arrow up"} color={(missed) ? "red" : "green"}/>;
    return (<li style={{ margin: 10 }}>{Way}{moment(endTime).calendar()}</li>);
  }

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
      <Modal size="tiny" trigger={trigger} key={name+"-"+endTime+"-modal"}>
        <Modal.Header>
      <Icon name="phone" color="blue" /> Call details
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Modal.Header></Modal.Header>
            <li style={{ margin: 10 }}><Icon name="phone"/>{phoneNumber}</li>
            {this.getDuration(endTime, startTime)}
            {this.getTime(endTime, incoming, missed)}
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
