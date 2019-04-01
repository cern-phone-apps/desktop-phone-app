import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import RightColumn from "common/components/RightColumn/RightColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import CallModalContainer from "calls/components/call_modals/OutgoingCallModal/index";
import IncomingCallModalContainer from "calls/components/call_modals/IncomingCallModal/IncomingCallModalContainer";
import MainHeaderContainer from "calls/components/MainHeader";
import UserSearchContainer from "calls/components/search/UserSearch/UserSearchContainer";

export class ConnectedScreen extends Component {
  static propTypes = {
    calling: PropTypes.bool.isRequired
  };

  styles = { height: "100%" };
  dividedStyles = { paddingTop: "0", paddingBottom: 0 };

  render() {
    const { calling } = this.props;

    return (
      <Grid.Column
        computer={12}
        mobile={16}
        tablet={16}
        className={"CallsScreen__RightColumn"}
      >
        <RightColumn>
          <MainHeaderContainer/>
          <ErrorBoundary>
            <IncomingCallModalContainer/>
            {this.renderMainContent(calling)}
          </ErrorBoundary>
        </RightColumn>
      </Grid.Column>
    );
  }

  renderMainContent (calling) {
    return <Grid padded style={this.styles} className={"CallPage"}>
      <Grid.Row
        columns={1}
        divided
        style={this.dividedStyles}
      >
        <Grid.Column>
          {calling && <CallModalContainer modalOpen={calling}/>}
          <UserSearchContainer/>
        </Grid.Column>
      </Grid.Row>
    </Grid>;
  }
}

export default ConnectedScreen;
