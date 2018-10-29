import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Responsive, Segment } from "semantic-ui-react";

import "./CallsScreen.css";

import LeftColumn from "common/components/LeftColumn/LeftColumn";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";
import RightColumn from "common/components/RightColumn/RightColumn";
import RecentCallListContainer from "calls/containers/components/RecentCallList/RecentCallListContainer";
import OnCallMessageContainer from "calls/containers/components/OnCallMessage/OnCallMessageContainer";
import CallLoaderContainer from "calls/components/CallLoader/CallLoaderContainer";
import OnCallDetailsContainer from "calls/components/OnCallDetails/OnCallDetailsContainer";
import CallerContainer from "calls/components/Caller/CallerContainer";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";
import RightColumnHeader from "common/components/RightColumnHeader/RightColumnHeader";
import CalleeProfileContainer from "calls/components/CalleeProfile/CalleeProfileContainer";
import { getWindowTitle } from "calls/utils";
import DialpadContainer from "calls/components/Dialpad/DialpadContainer";
import CallingModalContainer from "calls/components/CallingModal/CallingModalContainer";
import NotConnectedScreen from "calls/components/NotConnectedScreen/NotConnectedScreen";

class CallsScreen extends Component {
  static propTypes = {
    calling: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    displayDialpad: PropTypes.bool.isRequired,
    userSelected: PropTypes.bool.isRequired
  };

  styles = { height: "100%" };
  dividedStyles = { paddingTop: "0", paddingBottom: 0 };

  render() {
    const { connected, calling, onCall, userSelected } = this.props;
    const connectedAndCalling = connected && calling;
    const connectedAndOnCall = connected && onCall;
    const onlyConnected = connected && (!onCall && !calling);

    let title = getWindowTitle(this.props);

    return (
      <Grid stackable className={"CallsScreen__Grid"}>
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
        <Grid.Column
          computer={12}
          mobile={16}
          tablet={16}
          className={"CallsScreen__RightColumn"}
        >
          <RightColumn>
            <Responsive
              as={RightColumnHeader}
              title={title}
              {...Responsive.onlyComputer}
            />
            <Responsive
              as={LeftColumnHeader}
              title={title}
              {...Responsive.onlyMobile}
            />
            <Responsive
              as={LeftColumnHeader}
              title={title}
              {...Responsive.onlyTablet}
            />
            <ErrorBoundary>
              {onCall && <OnCallMessageContainer />}
              <CallingModalContainer />
              <Grid padded style={this.styles} className={"CallPage"}>
                <Grid.Row columns={2} divided style={this.dividedStyles}>
                  <Grid.Column>
                    {onCall && (
                      <Segment basic>
                        <Grid.Column>
                          <DialpadContainer />
                        </Grid.Column>
                      </Segment>
                    )}
                    {!connected && <NotConnectedScreen />}
                    {onlyConnected && <CallerContainer />}
                  </Grid.Column>
                  <Grid.Column>
                    {userSelected && (
                      <Grid.Column>
                        <CalleeProfileContainer />
                      </Grid.Column>
                    )}
                    {connectedAndCalling && <CallLoaderContainer />}
                    {connectedAndOnCall && <OnCallDetailsContainer />}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </ErrorBoundary>
          </RightColumn>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CallsScreen;
