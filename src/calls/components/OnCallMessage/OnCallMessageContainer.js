import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OnCallMessage from 'calls/components/OnCallMessage/OnCallMessage'

function mapStateToProps ({calls}) {
  return {
    recipient: calls.call.recipient,
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(OnCallMessage))
