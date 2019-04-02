import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import UserSearchResultsList from "calls/components/search/UserSearchResultsList/UserSearchResultsList";
import { getUserProfile } from "calls/actions/profile";
import { selectUser } from "calls/actions/search";

function mapStateToProps({ calls }) {
  return {
    userSelected: calls.search.userSelected,
    searching: calls.search.searching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser,
      getUserProfile
    },
    dispatch
  );
}

export const UserSearchResultsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchResultsList);

export default UserSearchResultsListContainer;
