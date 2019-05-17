import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { callActions, connectionActions, recentActions } from 'dial-core';

import { info, success, warning } from 'common/actions/notifications';
import PhoneProvider from 'calls/providers/PhoneProvider/PhoneProvider';
import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';

export function mapStateToProps({ calls, auth }) {
  return {
    token: auth.token,
    doNotDisturb: calls.status.doNotDisturb,
    call: calls.call
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...connectionActions,
      ...callActions,
      ...recentActions,
      success,
      info,
      warning
    },
    dispatch
  );
}

export default withPhoneService(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneProvider)
);
