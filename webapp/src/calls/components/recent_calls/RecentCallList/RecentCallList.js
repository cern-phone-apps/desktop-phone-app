import React, { Component } from "react";
import PropTypes from "prop-types";

import { Item } from "semantic-ui-react";
import RecentCall from "calls/components/recent_calls/RecentCall/RecentCall";
import ScrollableContent from "common/components/ScrollableContent/ScrollableContent";
import RecentCallModal from "calls/components/recent_calls/RecentCallModal/RecentCallModal.js"

/**
 * Displays a scrollable list of RecentCall Components
 */
class RecentCallList extends Component {
  static propTypes = {
    recentCalls: PropTypes.array.isRequired
  };

  render() {
    const { recentCalls } = this.props;

    return (
      <ScrollableContent>
        <Item.Group link>
          {recentCalls.map((item, index) => {
            return (
              <RecentCallModal key={`recent-${index}`} recentCall={item}
              size="tiny"
              dimmer="blurring"
              closeIcon
              trigger={
                <RecentCall key={`recent-${index}`} recentCall={item}/>
              }
            />
            );
          })}
        </Item.Group>
      </ScrollableContent>
    );
  }
}

export default RecentCallList;
