import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Item } from 'semantic-ui-react';
import RecentCall from 'calls/components/recent_calls/RecentCall/RecentCall';
import ScrollableContent from 'common/components/ScrollableContent/ScrollableContent';
import RecentCallModal from 'calls/components/recent_calls/RecentCallModal/RecentCallModal';
import { logMessage } from 'common/utils/logs';

/**
 * Displays a scrollable list of RecentCall Components
 */
function RecentCallList({ recentCalls }) {
  const [open, setIsOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const selectRecentCall = recentCall => {
    setIsOpen(true);
    setSelectedCall(recentCall);
  };

  const handleClose = () => {
    logMessage('handle close');
    setIsOpen(false);
    setSelectedCall(null);
  };

  return (
    <ScrollableContent>
      <Item.Group link data-testid="RecentCallList">
        {recentCalls.map((item, index) => {
          if (item && !item.name) return null;
          return (
            <RecentCall
              key={`recent-${index.toString()}`}
              recentCallId={`recent-${index.toString()}`}
              recentCall={item}
              onClick={() => selectRecentCall(item)}
            />
          );
        })}
      </Item.Group>
      <RecentCallModal
        selectedCall={selectedCall}
        open={open}
        handleClose={handleClose}
      />
    </ScrollableContent>
  );
}

RecentCallList.propTypes = {
  recentCalls: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    })
  )
};

RecentCallList.defaultProps = {
  recentCalls: []
};

export default RecentCallList;
