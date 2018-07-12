import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'calls/actions/search'
import * as callActionCreators from 'calls/actions/call'
import Dialpad from 'calls/components/Dialpad/Dialpad'

function mapStateToProps ({calls}) {
  return {
    searchValue: calls.search.value
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...callActionCreators,
    ...searchActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialpad)
