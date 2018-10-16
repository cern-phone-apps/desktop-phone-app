import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'calls/actions/search'
import * as dialpadActionCreators from 'calls/actions/dialpad'
import UserSearch from 'calls/components/UserSearch/UserSearch'

function mapStateToProps ({calls}) {
  return {
    userSelected: calls.search.userSelected,
    dialpadValue: calls.dialpad.value,
    results: calls.search.searchResults,
    displayDialpad: calls.dialpad.display,
    onCall: calls.call.onCall,
    calling: calls.call.calling
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...searchActionCreators,
    ...dialpadActionCreators
  },
  dispatch)
}

export const UserSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearch)

export default UserSearchContainer
