import React, { Component } from "react";
import { Grid, Responsive } from "semantic-ui-react";
import LeftColumn from "common/components/LeftColumn/LeftColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";
import RecentCallListContainer from "calls/components/RecentCallList/RecentCallListContainer";

export class CallsScreenLeftColumn extends Component {
  render() {
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
            <RecentCallListContainer />
          </ErrorBoundary>
        </LeftColumn>
      </Responsive>
    );
  }
}
