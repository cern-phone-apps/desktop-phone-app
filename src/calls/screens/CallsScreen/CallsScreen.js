import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import "./CallsScreen.css";
import { CallsScreenLeftColumn } from "calls/screens/CallsScreen/LeftColumn/CallsScreenLeftColumn";
import CallsScreenRightColumnContainer from "calls/screens/CallsScreen/RightColumn/CallsScreenRightColumnContainer";

class CallsScreen extends Component {
  render() {
    return (
      <Grid stackable className={"CallsScreen__Grid"}>
        <CallsScreenLeftColumn />
        <CallsScreenRightColumnContainer />
      </Grid>
    );
  }
}

export default CallsScreen;
