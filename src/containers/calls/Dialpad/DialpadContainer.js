import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'actions/calls/search'
import * as callActionCreators from 'actions/calls/call'
import { Dialpad } from 'components/calls'

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
