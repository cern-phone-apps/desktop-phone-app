import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import './CallsScreen.css';
import PropTypes from 'prop-types';
import ConnectedScreen from 'calls/screens/CallsScreen/ConnectedScreen';
import OnCallScreen from 'calls/screens/CallsScreen/OnCallScreen';
import CallsSidebarContainer from 'calls/components/CallsSidebar/CallsSidebarContainer';

export function CallsScreen({ connected, onCall }) {
  if (!connected) {
    return <Redirect to="/register" />;
  }
  return (
    <Grid stackable className="CallsScreen__Grid">
      <CallsSidebarContainer />
      {connected && onCall && <OnCallScreen />}
      {connected && !onCall && <ConnectedScreen />}
    </Grid>
  );
}

CallsScreen.propTypes = {
  connected: PropTypes.bool.isRequired,
  onCall: PropTypes.bool.isRequired
};

export default CallsScreen;
