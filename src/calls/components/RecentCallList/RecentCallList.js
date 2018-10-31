import React, { Component } from "react";
import PropTypes from "prop-types";

import { Grid, Item, Responsive } from "semantic-ui-react";
import RecentCall from "calls/components/RecentCallList/RecentCall";
import ScrollableContent from "common/components/ScrollableContent/ScrollableContent";
import LeftColumn from "common/components/LeftColumn/LeftColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";

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
      <Responsive
        as={Grid.Column}
        width={4}
        className={"CallsScreen__LeftColumn"}
        {...Responsive.onlyComputer}
      >
        <LeftColumn>
          <ErrorBoundary>
            <LeftColumnHeader />
            <ScrollableContent>
              <Item.Group link>
                {recentCalls.map((item, index) => {
                  return (
                    <RecentCall key={`recent-${index}`} recentCall={item} />
                  );
                })}
              </Item.Group>
            </ScrollableContent>
          </ErrorBoundary>
        </LeftColumn>
      </Responsive>
    );
  }
}

export default RecentCallList;
