import React, { Component } from "react";
import PropTypes from "prop-types";
import { Column, Grid } from "semantic-ui-react";
import RightColumn from "common/components/RightColumn/RightColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import OnCallBannerContainer from "calls/components/OnCallBanner/OnCallBannerContainer";
import IncomingCallModalContainer from "calls/components/IncomingCallModal/IncomingCallModalContainer";
import LeftInnerColumnContainer from "calls/screens/CallsScreen/RightColumn/InnerColumns/LeftInnerColumnContainer";
import RightInnerColumnContainer from "calls/screens/CallsScreen/RightColumn/InnerColumns/RightInnerColumnContainer";
import CallsScreenRightColumnHeaderContainer from "calls/screens/CallsScreen/RightColumn/CallsScreenRightColumnHeaderContainer";

export class CallsScreenRightColumn extends Component {
  static propTypes = {
    onCall: PropTypes.any
  };

  styles = { height: "100%" };
  dividedStyles = { paddingTop: "0", paddingBottom: 0 };

  render() {
    const { onCall } = this.props;

    return (
      <Grid.Column
        computer={12}
        mobile={16}
        tablet={16}
        className={"CallsScreen__RightColumn"}
      >
        <RightColumn>
          <CallsScreenRightColumnHeaderContainer />
          <ErrorBoundary>
            {onCall && <OnCallBannerContainer />}
            <IncomingCallModalContainer />
            <Grid padded style={this.styles} className={"CallPage"}>
              <Grid.Row columns={2} divided style={this.dividedStyles}>
                <LeftInnerColumnContainer />
                <RightInnerColumnContainer />
              </Grid.Row>
            </Grid>
          </ErrorBoundary>
        </RightColumn>
      </Grid.Column>
    );
  }
}
