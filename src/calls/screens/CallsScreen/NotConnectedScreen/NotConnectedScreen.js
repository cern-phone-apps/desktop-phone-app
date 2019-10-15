import React from 'react';
import { translate } from 'react-i18next';
import { Header, Modal } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import ErrorBoundary from 'common/components/ErrorBoundary/ErrorBoundary';
import ErrorMessageContainer from 'common/components/ErrorMessage/ErrorMessageContainer';
import LogoutButtonContainer from 'auth/components/LogoutButton/LogoutButtonContainer';
import NumberConnectorContainer from 'calls/components/NumberConnector/NumberConnectorContainer';
import { DownloadDebugLogsButton } from 'debug/components/DownloadDebugLogsButton/DownloadDebugLogsButton';
import SettingsButtonContainer from 'common/components/SettingsButton/SettingsButtonContainer';
import SettingsModalContainer from 'settings/components/SettingsModal/SettingsModalContainer';

function SelectPhoneNumberModal() {
  const loginErrorSolutions = [
    'You can try again in few minutes.',
    'Try to logout and login again.',
    'If the problem persists contact support.'
  ];
  return (
    <Modal open size="small" className="SelectPhoneModal">
      <Header icon="phone" content="Select a phone number" />
      <Modal.Content>
        <ErrorMessageContainer solutions={loginErrorSolutions} />
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

function NotConnectedScreen({ isAuthenticated, connected }) {
  if (!isAuthenticated) return <Redirect to="/login" />;
  if (connected) return <Redirect to="/home" />;
  return (
    <ErrorBoundary>
      <SettingsModalContainer />
      <SelectPhoneNumberModal />
    </ErrorBoundary>
  );
}

export default translate('calls')(NotConnectedScreen);
