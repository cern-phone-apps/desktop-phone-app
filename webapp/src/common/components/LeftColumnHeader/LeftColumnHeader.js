import React, { Component } from 'react';
import { Grid, Header, Responsive } from 'semantic-ui-react';

import './LeftColumnHeader.css';
import ToggleButtonContainer from 'common/components/ToggleButton/ToggleButtonContainer';
import { ColumnHeader } from 'common/components/ColumnHeader/ColumnHeader';
import { ConnectionStatusModalContainerWithPhoneService } from 'calls/components/ConnectionStatusModal/ConnectionStatusModalContainer';
import { ErrorButtonContainerWithPhoneService } from 'common/components/ErrorButton/ErrorButtonContainer';

class LeftColumnHeader extends Component {
  centerColumnStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  };

  render() {
    const { title } = this.props || '';

    return (
      <ColumnHeader>
        <Grid.Row>
          <Grid.Column textAlign="left" width={4} verticalAlign="middle">
            <ToggleButtonContainer />
          </Grid.Column>
          <Grid.Column
            style={this.centerColumnStyles}
            textAlign="center"
            width={8}
          >
            <Header as="h4">
              {title}{' '}
              <Responsive
                as={ErrorButtonContainerWithPhoneService}
                {...Responsive.onlyMobile}
              />
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width={4} verticalAlign="middle">
            <ConnectionStatusModalContainerWithPhoneService />
          </Grid.Column>
        </Grid.Row>
      </ColumnHeader>
    );
  }
}

export default LeftColumnHeader;
