import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import CalleeProfileContainer from "calls/components/CalleeProfile/CalleeProfileContainer";
import OutgoingCallLoaderContainer from "calls/components/OutgoingCallLoader/OutgoingCallLoaderContainer";
import OnCallDetailsContainer from "calls/components/OnCallDetails/OnCallDetailsContainer";

export class RightInnerColumn extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    userSelected: PropTypes.bool.isRequired
  };

  render () {
    const { connected, calling, onCall, userSelected } = this.props;

    const connectedAndCalling = connected && calling;
    const connectedAndOnCall = connected && onCall;

    return (
      <Grid.Column>
        {userSelected && (
          <Grid.Column>
            <CalleeProfileContainer/>
          </Grid.Column>
        )}
        {connectedAndCalling && <OutgoingCallLoaderContainer/>}
        {connectedAndOnCall && <OnCallDetailsContainer/>}
      </Grid.Column>
    );
  }
}