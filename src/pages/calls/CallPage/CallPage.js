import React, {Component} from 'react'

import './Callpage.css'
import {LeftColumn, LeftColumnHeader, RightColumn} from 'components/common'
import {RecentCallListContainer} from 'containers/pages/calls'
import {
  CallerContainer, CallLoaderContainer, NotConnectedScreenContainer, OnCallDetailsContainer,
  OnCallMessageContainer
} from 'containers/components/calls'

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
          <RecentCallListContainer/>
        </LeftColumn>
        <RightColumn>
          {this.props.onCall && <OnCallMessageContainer/>}
          <div className={`padded-item ${callContentClass}`}>
            <div className="centered-element">
              {!this.props.connected && <NotConnectedScreenContainer/>}
              {this.props.connected && this.props.calling && <CallLoaderContainer/>}
              {this.props.connected && this.props.onCall && <OnCallDetailsContainer/>}
              {(this.props.connected && (!this.props.onCall && !this.props.calling)) && <CallerContainer/>}
            </div>
          </div>
        </RightColumn>
      </div>
    )
  }
}

export default CallPage
