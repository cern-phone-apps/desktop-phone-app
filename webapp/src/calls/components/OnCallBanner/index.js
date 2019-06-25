import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OnCallBanner from "./OnCallBanner";

function mapStateToProps ({calls}) {
  return {
    caller: calls.call.remote,
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(OnCallBanner))
