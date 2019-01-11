import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { unSelectUser } from "calls/actions/search";
import { UserPhoneNumber } from "./UserPhoneNumber";
import { phoneService } from "calls/providers/PhoneProvider/PhoneProvider";

function mapStateToProps({ calls }) {
  return {
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

export const UserPhoneNumberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPhoneNumber);

export default phoneService(UserPhoneNumberContainer);
