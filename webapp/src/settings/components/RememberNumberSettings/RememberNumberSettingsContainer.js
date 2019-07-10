import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as setttingsActions from 'settings/actions/settings';

import RememberNumberSettings from './RememberNumberSettings';

function mapStateToProps({ auth, calls, settings }) {
  return {
    toneToken: auth.toneToken,
    activeNumber: calls.numbers.activeNumber,
    rememberNumber: settings.settings.rememberNumber
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setRememberNumber: setttingsActions.setRememberNumber
    },
    dispatch
  );
}

export const RememberNumberSettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RememberNumberSettings);

export default RememberNumberSettingsContainer;
