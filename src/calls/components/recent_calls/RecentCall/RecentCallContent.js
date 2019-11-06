import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Item } from 'semantic-ui-react';
import moment from 'moment';

import styles from './RecentCallContent.module.css';

function RecentCallContent({ recentCall }) {
  const color = recentCall.missed ? 'red' : 'green';
  let printableDate;
  if (recentCall.startTime || recentCall.endTime)
    printableDate = recentCall.startTime
      ? moment(recentCall.startTime).calendar()
      : moment(recentCall.endTime).calendar();
  const duration = moment.duration(
    moment(recentCall.endTime).diff(moment(recentCall.startTime))
  );

  return (
    <Item.Content>
      <Item.Header className={styles.ItemHeader}>{recentCall.name}</Item.Header>
      <Item.Description className={styles.Content}>
        {recentCall.incoming ? (
          <Icon name="arrow down" color={color} />
        ) : (
          <Icon name="arrow up" color={color} />
        )}{' '}
        {recentCall.phoneNumber ? `(${recentCall.phoneNumber})` : ''}
      </Item.Description>
      <Item.Extra className={styles.ExtraContent}>
        <span className="date">
          {printableDate}{' '}
          {!recentCall.missed && recentCall.endTime && recentCall.startTime
            ? `- ${duration.humanize()}`
            : ''}
        </span>
      </Item.Extra>
    </Item.Content>
  );
}

RecentCallContent.propTypes = {
  recentCall: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    missed: PropTypes.bool,
    incoming: PropTypes.bool
  }).isRequired
};

export default RecentCallContent;
