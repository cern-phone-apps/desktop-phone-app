import React, { Component } from 'react';
import { Grid, Header, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './RightColumnHeader.css';
import ColumnHeader from 'common/components/ColumnHeader/ColumnHeader';
import { ErrorButtonContainerWithPhoneService } from 'common/components/ErrorButton/ErrorButtonContainer';
import { DownloadDebugLogsButton } from 'debug/components/DownloadDebugLogsButton/DownloadDebugLogsButton';

class RightColumnHeader extends Component {
  centerColumnStyles = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  };

  headerStyles = {
    minHeight: '53px'
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    activeNumber: PropTypes.string.isRequired
  };

  render() {
    const { title, activeNumber } = this.props;

    return (
      <ColumnHeader style={this.headerStyles} verticalAlign="middle">
        <Grid.Row>
          <Grid.Column textAlign="left" width={3} verticalAlign="middle">
            <Label>
              <Icon name="phone" /> {activeNumber}
            </Label>
          </Grid.Column>
          <Grid.Column
            style={this.centerColumnStyles}
            textAlign="center"
            width={10}
          >
            <Header as="h4">
              {title} <ErrorButtonContainerWithPhoneService />
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" width={3} verticalAlign="middle">
            <DownloadDebugLogsButton />
          </Grid.Column>
        </Grid.Row>
      </ColumnHeader>
    );
  }
}

export default RightColumnHeader;
