import React, {Component} from 'react'

import './Callpage.css'
import {LeftColumn, LeftColumnHeader, RightColumn} from 'components/common'
import {RecentCallsListContainer} from 'containers/main/calls'
import {CallerContainer, CallLoaderContainer, OnCallDetailsContainer, OnCallMessageContainer} from 'containers/calls'

class CallPage extends Component {
  render () {
    let callContentClass = (
      !this.props.searchValue ||
      this.props.onCall ||
      this.props.calling ||
      !this.props.displayDialpad
    ) ? 'CallPage__centered' : 'CallPage'

    return (
      <div className="parent-container">
        <LeftColumn>
          <LeftColumnHeader/>
          <RecentCallsListContainer/>
        </LeftColumn>
        <RightColumn>
          {this.props.onCall && <OnCallMessageContainer/>}
          <div className={`padded-item ${callContentClass}`}>
            <div className="centered-element">
              {this.props.calling && <CallLoaderContainer/>}
              {this.props.onCall && <OnCallDetailsContainer/>}
              {(!this.props.onCall && !this.props.calling) && <CallerContainer/>}
            </div>
          </div>
        </RightColumn>
      </div>
    )
  }
}

export default CallPage
