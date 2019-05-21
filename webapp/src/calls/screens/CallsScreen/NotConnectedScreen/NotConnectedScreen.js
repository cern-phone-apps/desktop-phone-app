import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Grid, Header, Segment, Modal } from 'semantic-ui-react';
import RightColumn from 'common/components/RightColumn/RightColumn';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import MainHeader from 'calls/components/MainHeader';
import ErrorMessageContainer from 'common/components/ErrorMessage/ErrorMessageContainer';
import LogoutButtonContainer from 'auth/components/LogoutButton/LogoutButtonContainer';
import NumberConnectorContainer from 'calls/components/NumberConnector/NumberConnectorContainer';

export class SelectPhoneNumberModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.modalOpen}
        size="small"
        className={'SelectPhoneModal'}
      >
        <Header icon="phone" content="Select a phone number" />
        <Modal.Content>
          <ErrorMessageContainer />
          <p>
            Select which one of your phone numbers you want to use with this
            client.
          </p>
          <NumberConnectorContainer />
          <hr />
          <LogoutButtonContainer color="red" />
        </Modal.Content>
      </Modal>
    );
  }
}

export class NotConnectedScreen extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  };

  render() {
    return (
      <Grid.Column
        computer={12}
        mobile={16}
        tablet={16}
        className="CallsScreen__RightColumn"
      >
        <RightColumn>
          <MainHeader />
          <ErrorBoundary>
            <div className="call-inner-content">
              <Segment textAlign="center" basic>
                <SelectPhoneNumberModal modalOpen />
              </Segment>
            </div>
          </ErrorBoundary>
        </RightColumn>
      </Grid.Column>
    );
  }
}

export default translate('calls')(NotConnectedScreen);
