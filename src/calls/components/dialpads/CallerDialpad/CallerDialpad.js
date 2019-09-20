import PropTypes from 'prop-types';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import { buildcaller, formatPhoneNumber } from 'calls/utils/utils';
import { logMessage } from 'common/utils/logs';

import { CallButton } from '../../CallButton/CallButton';
import Dialpad from '../Dialpad/Dialpad';

// eslint-disable-next-line import/prefer-default-export
export class CallerDialpad extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    phoneService: PropTypes.object.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    dialpadValue: PropTypes.string.isRequired,
    updateDialpadValue: PropTypes.func.isRequired
  };

  makeCall = () => {
    const { dialpadValue } = this.props;
    
    if (dialpadValue === '') return;

    const formattedNumber = formatPhoneNumber(dialpadValue);

    const caller = {
      name: dialpadValue,
      phoneNumber: formattedNumber
    };

    this.props.unSelectUser();
    this.props.phoneService.makeCall(buildcaller(caller));
  };

  handleDialPadButtonClick = value => {
    logMessage('handleDialPadButtonClick: ', value);
    logMessage('handleDialPadButtonClick: ', this.props.dialpadValue);
    this.props.updateDialpadValue(this.props.dialpadValue + value);
  };

  render = () => (
    <Segment attached="bottom" className="Dialpad">
      <Dialpad handleButtonClick={this.handleDialPadButtonClick}>
        <Grid.Row>
          <Grid.Column />
          <Grid.Column textAlign="center">
            <CallButton
              onClick={this.makeCall}
              text={<Icon name="phone" />}
            />
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Dialpad>
    </Segment>
  );
}
