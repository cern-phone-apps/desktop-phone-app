import React, {Component} from "react";
import { Icon, Segment, Grid } from "semantic-ui-react";
import { CallButton } from "../CallerDialpad/CallerDialpad";
import { logMessage } from "common/utils";
import Dialpad from "../Dialpad/Dialpad";
import PropTypes from "prop-types";

export class DtmfDialpad extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    sendDtmfClick: PropTypes.func.isRequired,
  };

  render = () => {
    return (
      <Segment attached="bottom" className={"Dialpad"}>
        <Dialpad handleButtonClick={this.props.onButtonClick}>
          {this.sendDtfmRow()}
        </Dialpad>
      </Segment>
    );
  };

  sendDtfmRow = () => {
    return <Grid.Row>
      <Grid.Column/>
      <Grid.Column textAlign={"center"}>
        <CallButton
          clickHandler={this.props.sendDtmfClick}
          text={<Icon name={"send"}/>}
        />
      </Grid.Column>
      <Grid.Column/>
    </Grid.Row>;
  }
}
