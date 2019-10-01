import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dialBackendApi from 'services/api';

import DoNotDisturbSettings from './DoNotDisturbSettings';

function mapStateToProps({ status }) {
  return {
    doNotDisturb: status.doNotDisturb
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUserDoNotDisturb: dialBackendApi().setUserDoNotDisturb,
      getMe: dialBackendApi().getMe
    },
    dispatch
  );
}

export const RecentCallsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DoNotDisturbSettings);

export default RecentCallsContainer;