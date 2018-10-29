import { connect } from "react-redux";
import { CalleeProfile } from "./CalleeProfile";

function mapStateToProps({ calls }) {
  return {
    username: calls.search.user.username,
    profile: calls.profile.profile,
    fetching: calls.profile.fetching
  };
}

export default connect(
  mapStateToProps,
  null
)(CalleeProfile);
