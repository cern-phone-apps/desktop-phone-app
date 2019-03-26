import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import { unSelectUser } from "calls/actions/search";
import UserProfileCloseButton from "calls/components/UserProfileCloseButton/UserProfileCloseButton";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectUser
    },
    dispatch
  );
}

export const UserProfileCloseButtonContainer = connect(
  null,
  mapDispatchToProps
)(UserProfileCloseButton);