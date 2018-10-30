import { connect } from 'react-redux'
import Caller from 'calls/components/Caller/Caller'

function mapStateToProps ({calls}) {
  return {
    displayDialpad: calls.dialpad.display
  }
}


export default connect(
  mapStateToProps,
  null
)(Caller)
