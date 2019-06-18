import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  connectionActions,
  callActions,
  recentCallsActions,
  authActions,
  authActionFactory
} from 'dial-core';
import { PhoneProvider } from './PhoneProvider';
import { phoneService } from './PhoneService';

export function mapStateToProps({ calls, auth }) {
  return {
    authToken: auth.authToken,
    doNotDisturb: calls.status.doNotDisturb,
    call: calls.call,
    toneToken: auth.toneToken
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authActions,
      logout: authActionFactory(process.env.REACT_APP_API_ENDPOINT).logout,
      ...connectionActions,
      ...callActions,
      ...recentCallsActions
    },
    dispatch
  );
}

export default phoneService(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneProvider)
);
