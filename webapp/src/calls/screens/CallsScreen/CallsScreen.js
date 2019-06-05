import React from 'react';
import { Grid } from 'semantic-ui-react';

import './CallsScreen.css';
import PropTypes from 'prop-types';
import NotConnectedScreen from 'calls/screens/CallsScreen/NotConnectedScreen/NotConnectedScreen';
import ConnectedScreen from 'calls/screens/CallsScreen/ConnectedScreen';
import OnCallScreen from 'calls/screens/CallsScreen/OnCallScreen';
import CallsSidebarContainer from 'calls/components/CallsSidebar/CallsSidebarContainer';
import IncomingCallModalContainer from 'calls/components/call_modals/IncomingCallModal/IncomingCallModalContainer';

export function CallsScreen({ connected, onCall }) {
  return (
    <Grid stackable className="CallsScreen__Grid">
      <CallsSidebarContainer />
      {connected && onCall && <OnCallScreen />}
      {connected && !onCall && <ConnectedScreen />}
      {!connected && <NotConnectedScreen />}
      <IncomingCallModalContainer />
    </Grid>
  );
}

CallsScreen.propTypes = {
  connected: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired
};

export default CallsScreen;
