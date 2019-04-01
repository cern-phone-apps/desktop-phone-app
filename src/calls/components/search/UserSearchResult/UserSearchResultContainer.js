import { connect } from "react-redux";
import { selectUser } from "calls/actions/search";
import { bindActionCreators } from "redux";
import UserSearchResult from "./UserSearchResult";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectUser
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(UserSearchResult);
