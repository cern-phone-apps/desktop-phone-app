import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Segment } from "semantic-ui-react";
import DialpadContainer from "calls/components/Dialpad/DialpadContainer";
import NotConnectedScreen from "calls/components/NotConnectedScreen/NotConnectedScreen";
import CallerContainer from "calls/components/Caller/CallerContainer";

export class LeftInnerColumn extends Component {
  static propTypes = {
    onCall: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired
  };

  render () {
    const {connected, onCall, calling} = this.props;
    const onlyConnected = connected && (!onCall && !calling);
    return (
      <Grid.Column>
        {this.props.onCall && (
          <Segment basic>
            <Grid.Column>
              <DialpadContainer/>
            </Grid.Column>
          </Segment>
        )}
        {!this.props.connected && <NotConnectedScreen/>}
        {onlyConnected && <CallerContainer/>}
      </Grid.Column>
    );
  }
}

export default LeftInnerColumn;