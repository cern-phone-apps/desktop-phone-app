import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { LeftColumn, LeftColumnHeader } from 'components/common'
import {NotSelectedPageContainer} from 'containers/main/chat'

class ChatPage extends Component {
  render () {
    const {match} = this.props
    console.debug('match', match)
    return (
      <div className="parent-container">
        <LeftColumn>
          <LeftColumnHeader/>
        </LeftColumn>
        <Switch>
          <Route path={match.path} exact component={NotSelectedPageContainer}/>
        </Switch>
      </div>
    )
  }
}

export default ChatPage
