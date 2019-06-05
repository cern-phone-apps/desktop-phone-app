import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import {
  callActions,
  connectionActions,
  recentCallsActions,
  authActions,
  authActionFactory
} from 'dial-core';

import { info, success, warning } from 'common/actions/notifications';
import PhoneProvider from 'calls/providers/PhoneProvider/PhoneProvider';
import { withPhoneService } from 'calls/providers/PhoneProvider/PhoneService';

export function mapStateToProps({ calls, auth }) {
  return {
    authToken: auth.authToken,
    doNotDisturb: calls.status.doNotDisturb,
    call: calls.call,
    toneToken: auth.toneToken
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authActions,
      logout: authActionFactory(process.env.REACT_APP_API_ENDPOINT).logout,
      ...connectionActions,
      ...callActions,
      ...recentCallsActions,
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
