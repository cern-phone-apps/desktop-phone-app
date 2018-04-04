import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'actions/calls/search'
import * as callActionCreators from 'actions/calls/call'
import { Caller } from 'components/calls'

function mapStateToProps ({calls}) {
  return {
    userSelected: calls.search.userSelected,
    searchValue: calls.search.value,
    calling: calls.call.calling,
    onCall: calls.call.onCall
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
)(Caller)
