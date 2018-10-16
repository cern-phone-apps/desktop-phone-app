import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as callActionCreators from 'calls/actions/call'
import * as dialpadActionCreators from 'calls/actions/dialpad'
import Dialpad, {CallerDialpad} from 'calls/components/Dialpad/Dialpad'

function mapStateToProps ({calls}) {
  return {
    dialpadValue: calls.dialpad.value
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
    ...dialpadActionCreators
  }, dispatch)
}

export const CallerDialpadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallerDialpad)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialpad)
