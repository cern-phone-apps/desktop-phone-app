import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, Item } from 'semantic-ui-react';
import RecentCallModal from 'calls/components/recent_calls/RecentCallModal/RecentCallModal.js';

import styles from '../RecentCallList/RecentCall.module.css';

function RecentCallContent(props) {
  return (
    <Item.Content>
      <Item.Header className={styles.ItemHeader}>{props.name}</Item.Header>
      <Item.Description className={styles.Content}>
        {props.incoming ? (
          <Icon name="arrow down" color={props.color} />
        ) : (
          <Icon name="arrow up" color={props.color} />
        )}{' '}
        {props.phoneNumber ? `(${props.phoneNumber})` : ''}
      </Item.Description>
      <Item.Extra className={styles.ExtraContent}>
        <span className="date">
          {props.printableDate}{' '}
          {!props.missed ? `- ${props.duration.humanize()}` : ''}
        </span>
      </Item.Extra>
    </Item.Content>
  );
}

RecentCallContent.propTypes = {
  name: PropTypes.any,
  incoming: PropTypes.any,
  color: PropTypes.string,
  phoneNumber: PropTypes.any,
  printableDate: PropTypes.string,
  missed: PropTypes.any,
  duration: PropTypes.any
};

class RecentCall extends Component {
  static propTypes = {
    recentCall: PropTypes.object.isRequired
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
    const { index } = this.props;
    const color = missed ? 'red' : 'green';
    const printableDate = moment(endTime).calendar();
    const duration = moment.duration(moment(endTime).diff(moment(startTime)));

    return (
      <RecentCallModal
        recentCall={this.props.recentCall}
        trigger={
          <Item
            tabIndex="0"
            aria-label={`${missed ? 'missed' : ''} call from ${phoneNumber}`}
            className="padded-item RecentCall"
            key={`${name}-${endTime}-item`}
          >
            <Icon
              name="phone"
              size="large"
              color="grey"
              className="ui avatar"
            />

            <RecentCallContent
              name={name}
              incoming={incoming}
              color={color}
              phoneNumber={phoneNumber}
              printableDate={printableDate}
              missed={missed}
              duration={duration}
              index={index}
            />
          </Item>
        }
      />
    );
  }
}

export default RecentCall;
