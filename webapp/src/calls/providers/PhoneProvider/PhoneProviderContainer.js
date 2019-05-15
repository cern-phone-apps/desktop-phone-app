import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as connectionActionCreators from 'calls/actions/connection';
import * as callActionCreators from 'calls/actions/call';
import * as recentActionCreators from 'calls/actions/recent';
import { info, success, warning } from 'common/actions/notifications';
import PhoneProvider, {
  phoneService
} from 'calls/providers/PhoneProvider/PhoneProvider';

export function mapStateToProps({ calls, auth }) {
  return {
    recipient: calls.call ? calls.call.recipient : undefined,
    onCall: calls.call ? calls.call.onCall : false,
    token: auth.token,
    doNotDisturb: calls.status.doNotDisturb
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...connectionActionCreators,
      ...callActionCreators,
      ...recentActionCreators,
      success,
      info,
      warning
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
