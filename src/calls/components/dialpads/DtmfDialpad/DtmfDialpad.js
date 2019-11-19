import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CallButton } from '../CallerDialpad/CallButton';
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
        <CallButton clickHandler={this.props.sendDtmfClick} content="Send" />
      </Grid.Column>
      <Grid.Column />
    </Grid.Row>
  );
}
