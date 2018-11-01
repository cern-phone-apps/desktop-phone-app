import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import RightColumn from "common/components/RightColumn/RightColumn";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import CallModalContainer from "calls/components/call_modals/OutgoingCallModal/index";
import IncomingCallModalContainer from "calls/components/call_modals/IncomingCallModal/index";
import MainHeaderContainer from "calls/components/MainHeader";
import UserProfileContainer from "calls/components/UserProfile/UserProfileContainer";
import UserSearchContainer from "calls/components/UserSearch/UserSearchContainer";

export class ConnectedScreen extends Component {
  static propTypes = {
    userSelected: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired
  };

  styles = { height: "100%" };
  dividedStyles = { paddingTop: "0", paddingBottom: 0 };

  render() {
    const { userSelected, calling } = this.props;
    const numberOfColumns = userSelected ? 2 : 1;

    return (
      <Grid.Column
        computer={12}
        mobile={16}
        tablet={16}
        className={"CallsScreen__RightColumn"}
      >
        <RightColumn>
          <MainHeaderContainer />
          <ErrorBoundary>
            <IncomingCallModalContainer />
            <Grid padded style={this.styles} className={"CallPage"}>
              <Grid.Row
                columns={numberOfColumns}
                divided
                style={this.dividedStyles}
              >
                <Grid.Column>
                  {calling && <CallModalContainer modalOpen={calling} />}
                  <UserSearchContainer />
                </Grid.Column>
                {userSelected && (
                  <Grid.Column>
                    <UserProfileContainer />
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </ErrorBoundary>
        </RightColumn>
      </Grid.Column>
    );
  }
}

export default ConnectedScreen;
