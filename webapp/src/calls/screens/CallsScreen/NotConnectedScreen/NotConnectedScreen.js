import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Grid, Header, Segment, Modal, Message } from 'semantic-ui-react';

import RightColumn from 'common/components/RightColumn/RightColumn';
import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import MainHeaderContainer from 'calls/components/MainHeader/MainHeaderContainer';
import ErrorMessageContainer from 'common/components/ErrorMessage/ErrorMessageContainer';
import LogoutButtonContainer from 'auth/components/LogoutButton/LogoutButtonContainer';
import NumberConnectorContainer from 'calls/components/NumberConnector/NumberConnectorContainer';
import { DownloadDebugLogsButton } from 'debug/components/DownloadDebugLogsButton/DownloadDebugLogsButton';
import SettingsButtonContainer from 'common/components/SettingsButton/SettingsButtonContainer';

function SelectPhoneNumberModal({ modalOpen }) {
  const getCERNCertificatesURL = () =>
    'https://cafiles.cern.ch/cafiles/certificates/Grid.aspx';

  return (
    <Modal open={modalOpen} size="small" className="SelectPhoneModal">
      <Header icon="phone" content="Select a phone number" />
      <Modal.Content>
        <Message
          info
          icon="certificate"
          header="Have you installed CERN certificates?"
          content={
            <p>
              CERN CA certificates are required to run this application. If you
              haven&apos;t installed them yet, please follow the steps{' '}
              <a
                href={getCERNCertificatesURL()}
                target="_blank"
                rel="noopener noreferrer"
              >
                in this URL
              </a>
              .
            </p>
          }
        />
        <ErrorMessageContainer />
        <p>
          Select which one of your phone numbers you want to use with this
          client.
        </p>
        <NumberConnectorContainer />
        <hr />
        <DownloadDebugLogsButton floated="right" />
        <SettingsButtonContainer floated="right" />
        <LogoutButtonContainer color="red" />
      </Modal.Content>
    </Modal>
  );
}

SelectPhoneNumberModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired
};

function NotConnectedScreen({ t }) {
  return (
    <Grid.Column
      computer={12}
      mobile={16}
      tablet={16}
      className="CallsScreen__RightColumn"
    >
      <RightColumn>
        <MainHeaderContainer />
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

NotConnectedScreen.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate('calls')(NotConnectedScreen);
