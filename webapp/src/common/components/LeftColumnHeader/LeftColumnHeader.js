import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import ToggleButtonContainer from 'common/components/ToggleButton/ToggleButtonContainer';
import { ColumnHeader } from 'common/components/ColumnHeader/ColumnHeader';
import { ConnectionStatusModalContainerWithPhoneService } from 'calls/components/ConnectionStatusModal/ConnectionStatusModalContainer';

class LeftColumnHeader extends Component {
  centerColumnStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  };

  render() {
    return (
      <ColumnHeader>
        <Grid.Row>
          <Grid.Column
            floated="left"
            textAlign="left"
            width={4}
            verticalAlign="middle"
          >
            <ToggleButtonContainer />
          </Grid.Column>
          <Grid.Column
            floated="right"
            textAlign="right"
            width={4}
            verticalAlign="middle"
          >
            <ConnectionStatusModalContainerWithPhoneService />
          </Grid.Column>
        </Grid.Row>
      </ColumnHeader>
    );
  }
}

export default LeftColumnHeader;
