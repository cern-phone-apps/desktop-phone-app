import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import "./CallsScreen.css";
import RecentCallListContainer from "calls/components/RecentCallList/index";
import PropTypes from "prop-types";
import NotConnectedScreen from "calls/screens/CallsScreen/NotConnectedScreen/NotConnectedScreen";
import ConnectedScreen from "calls/screens/CallsScreen/ConnectedScreen";
import OnCallScreen from "calls/screens/CallsScreen/OnCallScreen";

class CallsScreen extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
  };
  render() {
    const {connected, onCall} = this.props;
    return (
      <Grid stackable className={"CallsScreen__Grid"}>
        <RecentCallListContainer />
        {connected && onCall && <OnCallScreen />}
        {connected && <ConnectedScreen />}
        {!connected && <NotConnectedScreen />}
      </Grid>
    );
  }
}

export default CallsScreen;
