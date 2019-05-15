import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import "./CallsScreen.css";
import PropTypes from "prop-types";
import NotConnectedScreen from "calls/screens/CallsScreen/NotConnectedScreen/NotConnectedScreen";
import ConnectedScreen from "calls/screens/CallsScreen/ConnectedScreen";
import OnCallScreen from "calls/screens/CallsScreen/OnCallScreen";
import CallsSidebarContainer from "calls/components/CallsSidebar/CallsSidebarContainer";

export class CallsScreen extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired
  };
  render() {
    const { connected, onCall } = this.props;
    return (
      <Grid stackable className={"CallsScreen__Grid"}>
        <CallsSidebarContainer />
        {connected && onCall && <OnCallScreen />}
        {connected && !onCall && <ConnectedScreen />}
        {!connected && <NotConnectedScreen />}
      </Grid>
    );
  }
}

export default CallsScreen;
