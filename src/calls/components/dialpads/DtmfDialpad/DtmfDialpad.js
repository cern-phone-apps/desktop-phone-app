import React, {Component} from "react";
import { Segment, Grid } from "semantic-ui-react";
import { CallButton } from "../CallerDialpad/CallButton";
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
          {this.printDtmfRow()}
        </Dialpad>
      </Segment>
    );
  };

  printDtmfRow = () => {
    return <Grid.Row>
      <Grid.Column/>
      <Grid.Column textAlign={"center"}>
        <CallButton
          clickHandler={this.props.sendDtmfClick}
          text={"Send"}
        />
      </Grid.Column>
      <Grid.Column/>
    </Grid.Row>;
  }
}
