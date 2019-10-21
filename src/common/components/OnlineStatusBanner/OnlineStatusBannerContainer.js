import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setOnlineStatus } from 'settings/actions/settings';
import OnlineStatusBanner from './OnlineStatusBanner';

function mapStateToProps({ settings, auth }) {
  return {
    onlineStatus: settings.settings.onlineStatus,
    authError: auth.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setOnlineStatus
    },
    dispatch
  );
}

export const ConnectedOnlineStatusBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineStatusBanner);

export default ConnectedOnlineStatusBanner;
