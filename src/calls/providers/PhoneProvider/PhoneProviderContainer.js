import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as connectionActionCreators from "calls/actions/connection";
import * as callActionCreators from "calls/actions/call";
import * as recentActionCreators from "calls/actions/recent";
import * as authActionCreators from "auth/actions/auth";
import { info, success, warning } from "common/actions/notifications";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";
import PhoneProvider from "calls/providers/PhoneProvider/PhoneProvider";

export function mapStateToProps({ calls, auth }) {
  return {
    recipient: calls.call ? calls.call.recipient : undefined,
    onCall: calls.call ? calls.call.onCall : false,
    token: auth.token,
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...connectionActionCreators,
      ...callActionCreators,
      ...recentActionCreators,
      ...authActionCreators,
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
