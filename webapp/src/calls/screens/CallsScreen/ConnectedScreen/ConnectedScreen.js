import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import RightColumn from 'common/components/RightColumn/RightColumn';
import CallModalContainer from 'calls/components/call_modals/OutgoingCallModal/OutgoingCallModalContainer';
import MainHeaderContainer from 'calls/components/MainHeader';
import CallerTabsSelectorContainer from 'calls/components/CallerTabsSelector/CallerTabsSelectorContainer';
import CallForwardingBannerContainer from 'settings/components/CallForwardingSettings/CallForwardingBanner/CallForwardingBannerContainer';
import styles from './ConnectedScreen.module.css';
import IncomingCallModalContainer from 'calls/components/call_modals/IncomingCallModal/IncomingCallModalContainer';

export const ConnectedScreen = ({ calling }) => (
  <Grid.Column
    computer={12}
    mobile={16}
    tablet={16}
    className="CallsScreen__RightColumn"
  >
    <RightColumn className={styles.container}>
      <div className={styles.innerContainer}>
        <MainHeaderContainer />
        <IncomingCallModalContainer />
        <CallForwardingBannerContainer />
        <div>
          <div>
            {calling && <CallModalContainer modalOpen={calling} />}
            <CallerTabsSelectorContainer />
          </div>
        </div>
      </div>
    </RightColumn>
  </Grid.Column>
);
ConnectedScreen.propTypes = {
  calling: PropTypes.bool.isRequired
};

export default ConnectedScreen;
