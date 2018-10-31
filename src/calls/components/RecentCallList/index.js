import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import RecentCallList from "./RecentCallList";

function mapStateToProps({ calls }) {
  return {
    recentCalls: calls.recent.recentCalls
  };
}

export default withRouter(
  connect(
    mapStateToProps
  )(RecentCallList)
);
