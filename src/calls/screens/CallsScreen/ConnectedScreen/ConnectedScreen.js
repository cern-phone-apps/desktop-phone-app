import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import RightColumn from 'common/components/RightColumn/RightColumn';
import CallModalContainer from 'calls/components/call_modals/OutgoingCallModal/OutgoingCallModalContainer';
import MainHeaderContainer from 'calls/components/MainHeader/MainHeaderContainer';
import CallerTabsSelectorContainer from 'calls/components/CallerTabsSelector/CallerTabsSelectorContainer';
import CallForwardingBanner from 'settings/components/CallForwardingSettings/CallForwardingBanner/CallForwardingBanner';
import IncomingCallModalContainer from 'calls/components/call_modals/IncomingCallModal/IncomingCallModalContainer';
import styles from './ConnectedScreen.module.css';
import RateCallQualityContainer from 'calls/components/RateCallQuality/RateCallQualityContainer';

export const ConnectedScreen = ({ calling, lastCall }) => (
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
        <CallForwardingBanner />
        <RateCallQualityContainer lastCall={lastCall} />
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
