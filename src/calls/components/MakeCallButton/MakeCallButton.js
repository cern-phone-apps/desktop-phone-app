import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'semantic-ui-react'

class MakeCallButton extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    makeCall: PropTypes.func.isRequired,
    connected: PropTypes.bool.isRequired
  }

  makeCall = () => {
    this.props.makeCall({
      name: this.props.author,
      number: this.props.phoneNumber,
      startTime: Date.now()
    })
  }

  render () {
    return (
      <Button
        className={'flat'}
        icon={'phone'}
        disabled={(this.props.onCall || this.props.calling || !this.props.connected)}
        onClick={this.makeCall}/>

    )
  }
}

export default MakeCallButton
