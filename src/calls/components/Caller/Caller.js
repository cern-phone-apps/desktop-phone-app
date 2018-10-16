import React, {Component} from 'react'
import {Segment} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import './Caller.css'
import UserSearchContainer from 'calls/containers/components/UserSearch/UserSearchContainer'

export class Caller extends Component {
  static propTypes = {
    userSelected: PropTypes.bool.isRequired,
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    activeNumber: PropTypes.string,
    makeCall: PropTypes.func.isRequired,
    toggleDialpad: PropTypes.func.isRequired,
    displayDialpad: PropTypes.bool.isRequired
  }

  handleDialPadDisplayButton = () => {
    this.props.toggleDialpad(!this.props.displayDialpad)
  }


  render () {

    const segmentStyles = {
      height: '100%'
    }
    return (
      <Segment basic style={segmentStyles}>
        <UserSearchContainer displayDialpadAction={this.handleDialPadDisplayButton}/>
      </Segment>
    )
  }
}

export default translate('calls')(Caller)
