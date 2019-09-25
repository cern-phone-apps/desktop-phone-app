import React from 'react';
import { Grid } from 'semantic-ui-react';

import './CallsScreen.css';
import PropTypes from 'prop-types';
import NotConnectedScreen from 'calls/screens/CallsScreen/NotConnectedScreen/NotConnectedScreen';
import ConnectedScreen from 'calls/screens/CallsScreen/ConnectedScreen';
import OnCallScreen from 'calls/screens/CallsScreen/OnCallScreen';
import CallsSidebarContainer from 'calls/components/CallsSidebar/CallsSidebarContainer';

export function CallsScreen({ connected, onCall }) {
  if (!connected)
    return (<NotConnectedScreen />);
  return (
    <Grid stackable className="CallsScreen__Grid">
      <CallsSidebarContainer />
      {connected && onCall && <OnCallScreen />}
      {connected && !onCall && <ConnectedScreen />}
      {!connected && <NotConnectedScreen />}
    </Grid>
  );
}

CallsScreen.propTypes = {
  connected: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired
};

export default CallsScreen;
