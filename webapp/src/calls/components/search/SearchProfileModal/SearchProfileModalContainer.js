import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SearchProfileModal } from "calls/components/search/SearchProfileModal/SearchProfileModal";
import { unSelectUser } from "calls/actions/search";

function mapStateToProps({ calls }) {
  return {
    userSelected: calls.search.userSelected,
    user: calls.search.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      unSelectUser,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProfileModal);
