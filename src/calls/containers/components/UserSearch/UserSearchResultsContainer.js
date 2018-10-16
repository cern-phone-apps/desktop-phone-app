import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import * as searchActionCreators from 'calls/actions/search'
import { withRouter } from 'react-router-dom'
import UserSearchResults from 'calls/components/UserSearch/UserSearchResults'

function mapStateToProps () {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...searchActionCreators
  },
  dispatch)
}

export const UserSearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchResults)

export default withRouter(UserSearchResultsContainer)
