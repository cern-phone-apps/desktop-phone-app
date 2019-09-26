import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CallButton } from "../CallerDialpad/CallButton";
import Dialpad from '../Dialpad/Dialpad';

export class DtmfDialpad extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    sendDtmfClick: PropTypes.func.isRequired
  };

  render = () => (
    <Segment attached="bottom" className="Dialpad">
      <Dialpad handleButtonClick={this.props.onButtonClick}>
        {this.printDtmfRow()}
      </Dialpad>
    </Segment>
  );

  printDtmfRow = () => (
    <Grid.Row>
      <Grid.Column />
      <Grid.Column textAlign="center">
        <CallButton
          onClick={this.props.sendDtmfClick}
          text={
            <div className="DialButton CallButton">
              <div className="DialButton__content">Send</div>
            </div>
          }
        />
      </Grid.Column>
      <Grid.Column />
    </Grid.Row>
  );
}
