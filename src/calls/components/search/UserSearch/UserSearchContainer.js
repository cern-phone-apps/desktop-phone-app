import { bindActionCreators } from "redux";

import { connect } from "react-redux";
import UserSearch from "calls/components/search/UserSearch/UserSearch";
import {selectUser, unSelectUser, searchUsers, clearSearchResults} from "calls/actions/search";
import {updateDialpadValue, toggleDialpad} from "calls/actions/dialpad";

function mapStateToProps({ calls }) {
  return {
    userSelected: calls.search.userSelected,
    dialpadValue: calls.dialpad.value,
    // results: calls.search.searchResults,
    displayDialpad: calls.dialpad.display,
    onCall: calls.call.onCall,
    calling: calls.call.calling
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser,
      unSelectUser,
      searchUsers,
      clearSearchResults,
      updateDialpadValue,
      toggleDialpad
    },
    dispatch
  );
}

export const UserSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearch);

export default UserSearchContainer;
