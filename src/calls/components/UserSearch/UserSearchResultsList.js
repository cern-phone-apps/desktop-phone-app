import React, {Component} from 'react'
import {Dimmer, Header, Icon, Loader, Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './UserSearch.css'
import {logMessage} from 'common/utils'


const UserSearchResult = ({onClick, item}) => {
  const styles = {
    cursor: 'pointer'
  }
  return (
    <Segment onClick={onClick} style={styles}>
      <Header as='h4'>
        <Icon name='user' color={'blue'}/>
        <Header.Content>
          {item.title}
          <Header.Subheader>{item.description} - {item.username}</Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  )
}


class UserSearchResultsList extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
    searching: PropTypes.bool.isRequired
  }

  handleResultSelect = (result) => {
    logMessage(result)
    this.props.selectUser(result)
    this.props.getUserProfile(result.username)
  }

  styles = {
    overflow: 'auto'
  }

  render () {
    const {results, searching} = this.props

    if (searching) {
      return (<Segment basic textAlign={'center'}>
        <Loader active inline='centered' content='Searching...'/>
      </Segment>)
    }

    return (
      <div style={this.styles}>
        {results.map((item, index) => {
          return (
            <UserSearchResult key={`item-${index}`} onClick={() => this.handleResultSelect(item)} item={item}/>
          )
        })
        }
      </div>
    )
  }
}

export default UserSearchResultsList
