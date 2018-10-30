import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OnCallBanner from "calls/components/OnCallBanner/OnCallBanner";

function mapStateToProps ({calls}) {
  return {
    recipient: calls.call.recipient,
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(OnCallBanner))
