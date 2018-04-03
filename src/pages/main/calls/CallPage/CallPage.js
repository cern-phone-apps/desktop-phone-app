import React, {Component} from 'react'

import './Callpage.css'
import {LeftColumn, LeftColumnHeader, RightColumn} from 'components/common'
import {RecentCallsListContainer} from 'containers/main/calls'

class CallPage extends Component {
  render () {
    let callContentClass = (!this.props.searchValue || this.props.onCall || this.props.calling) ? 'CallPage__centered' : 'CallPage'

    return (
      <div className="parent-container">
        <LeftColumn>
          <LeftColumnHeader/>
          <RecentCallsListContainer/>
        </LeftColumn>
        <RightColumn>
          <div className={`padded-item ${callContentClass} caller-with-bg`}>
            <div className="Aligner-item--fixed">
              Call Page
            </div>
          </div>
        </RightColumn>
      </div>
    )
  }
}

export default CallPage
