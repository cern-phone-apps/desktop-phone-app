import React, {Component} from 'react'

import './Callpage.css'
import {LeftColumn, LeftColumnHeader, RightColumn} from 'common/components'
import {RecentCallListContainer} from 'calls/containers/screens'
import {
  CallerContainer, CallLoaderContainer, NotConnectedScreenContainer, OnCallDetailsContainer,
  OnCallMessageContainer
} from 'calls/containers/components'
import PropTypes from 'prop-types'

class CallPage extends Component {

  static propTypes = {
    calling: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    searchValue: PropTypes.string.isRequired,
    displayDialpad: PropTypes.bool.isRequired
  }

  /**
   * Gets a css class depending on the state of the application
   *
   * @returns {string}
   */
  getContentClass () {
    const {searchValue, displayDialpad, onCall, calling} = this.props
    return (
      (!searchValue && !displayDialpad)
      || onCall
      || calling
    ) ? 'CallPage__centered' : 'CallPage'
  }

  render () {

    const {connected, calling, onCall, } = this.props

    const connectedAndCalling = connected && calling
    const connectedAndOnCall = connected && onCall
    const onlyConnected = (connected && (!onCall && !calling))

    const callContentClass = this.getContentClass()

    return (
      <div className="parent-container">
        <LeftColumn>
          <LeftColumnHeader/>
          <RecentCallListContainer/>
        </LeftColumn>
        <RightColumn>
          {onCall && <OnCallMessageContainer/>}
          <div className={`padded-item ${callContentClass}`}>
            <div className="centered-element">
              {!connected && <NotConnectedScreenContainer/>}
              {connectedAndCalling && <CallLoaderContainer/>}
              {connectedAndOnCall && <OnCallDetailsContainer/>}
              {onlyConnected && <CallerContainer/>}
            </div>
          </div>
        </RightColumn>
      </div>
    )
  }
}

export default CallPage
