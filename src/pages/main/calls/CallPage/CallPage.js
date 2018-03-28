import React, {Component} from 'react'
import {LeftColumn, LeftColumnHeader, RightColumn} from 'components/common'

class CallPage extends Component {
  render () {
    return (
      <div className="parent-container">
        <LeftColumn>
          <LeftColumnHeader/>
        </LeftColumn>
        <RightColumn>
          Call Page
        </RightColumn>
      </div>
    )
  }
}

export default CallPage
