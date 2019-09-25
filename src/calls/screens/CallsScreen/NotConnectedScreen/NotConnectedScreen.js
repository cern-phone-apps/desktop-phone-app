import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import {
  Header,
  Message,
  Divider
} from 'semantic-ui-react';

import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import ErrorMessageContainer from 'common/components/ErrorMessage/ErrorMessageContainer';
import LogoutButtonContainer from 'auth/components/LogoutButton/LogoutButtonContainer';
import NumberConnectorContainer from 'calls/components/NumberConnector/NumberConnectorContainer';
import { DownloadDebugLogsButton } from 'debug/components/DownloadDebugLogsButton/DownloadDebugLogsButton';
import SettingsButtonContainer from 'common/components/SettingsButton/SettingsButtonContainer';

function SelectPhoneNumberModal() {
  const getCERNCertificatesURL = () =>
    'https://cafiles.cern.ch/cafiles/certificates/Grid.aspx';

  return (
    <div
      style={{
        flex: 4,
        backgroundColor: 'white',
        padding: '5%',
        margin: 'auto',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        alignItems: 'center'
      }}
    >
      <Header icon="phone" content="Select a phone number" />
      <Divider clearing />
      <div>
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
      </div>
    </div>
  );
}

SelectPhoneNumberModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired
};

function NotConnectedScreen({ t }) {
  return (
    <ErrorBoundary>
      <SelectPhoneNumberModal />
    </ErrorBoundary>
  );
}

NotConnectedScreen.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate('calls')(NotConnectedScreen);
