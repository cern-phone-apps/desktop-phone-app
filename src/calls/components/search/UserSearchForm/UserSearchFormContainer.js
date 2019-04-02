import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import {selectUser, searchUsers, clearSearchResults} from "calls/actions/search";
import { UserSearchForm } from "calls/components/search/UserSearchForm/UserSearchForm";

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser,
      searchUsers,
      clearSearchResults,
    },
    dispatch
  );
}

export const UserSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchForm);

export default UserSearchFormContainer;