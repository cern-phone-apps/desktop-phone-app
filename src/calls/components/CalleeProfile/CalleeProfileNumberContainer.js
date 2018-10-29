import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { unSelectUser } from "calls/actions/search";
import { CalleeProfileNumber } from "./CalleeProfileNumber";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";

function mapStateToProps({ calls }) {
  return {
    unSelectUser: calls.search.unSelectUser,
    calling: calls.call.calling
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectUser
    },
    dispatch
  );
}

export const CalleeProfileNumberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalleeProfileNumber);

export default phoneService(CalleeProfileNumberContainer);
