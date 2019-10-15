import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Item } from 'semantic-ui-react';
import RecentCallContent from './RecentCallContent';

function RecentCall({ recentCall, onClick, recentCallId }) {
  return (
    <Item
      className="padded-item RecentCall"
      onClick={onClick}
      data-testid={recentCallId}
    >
      <Icon name="phone" size="large" color="grey" className="ui avatar" />
      <RecentCallContent recentCall={recentCall} />
    </Item>
  );
}

RecentCall.propTypes = {
  recentCall: PropTypes.shape({
    name: PropTypes.string.isRequired,
    endTime: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  recentCallId: PropTypes.string.isRequired
};

export default RecentCall;
