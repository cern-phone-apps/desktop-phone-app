import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import {toggleDialpad} from "calls/actions/dialpad";
import Caller from 'calls/components/Caller/Caller'

function mapStateToProps ({calls}) {
  return {
    displayDialpad: calls.dialpad.display
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    toggleDialpad
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caller)
