import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'calls/actions/search'
import * as profileActionCreators from 'calls/actions/profile'

import { withRouter } from 'react-router-dom'
import UserSearchResultsList from 'calls/components/UserSearch/UserSearchResultsList'

function mapStateToProps ({calls}) {
  return {
    userSelected: calls.search.userSelected,
    results: calls.search.searchResults,
    searching: calls.search.searching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...searchActionCreators,
    ...profileActionCreators
  },
  dispatch)
}

export const UserSearchResultsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchResultsList)

export default withRouter(UserSearchResultsListContainer)
