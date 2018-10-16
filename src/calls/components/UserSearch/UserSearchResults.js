import React, {Component} from 'react'

import './UserSearch.css'
import UserSearchResultsListContainer from 'calls/containers/components/UserSearch/UserSearchResultsListContainer'

class UserSearchResults extends Component {

  styles = {
    height: '1000%',
    display: 'flex',
    flexDirection: 'column'
  }

  render () {

    return (
      <div style={this.styles}>
        <UserSearchResultsListContainer/>
      </div>
    )
  }
}

export default UserSearchResults
