import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'actions/calls/search'
import { UserSearch } from 'components/calls'
import { withRouter } from 'react-router-dom'

function mapStateToProps ({calls}) {
  return {
    userSelected: calls.search.userSelected,
    value: calls.search.value,
    results: calls.search.searchResults
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...searchActionCreators
  },
  dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearch))
