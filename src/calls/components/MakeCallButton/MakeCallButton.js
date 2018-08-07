import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'semantic-ui-react'

class MakeCallButton extends Component {
  static propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    onCall: PropTypes.bool.isRequired,
    calling: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    phoneService: PropTypes.object.isRequired,
    recipient: PropTypes.object.isRequired
  }

  makeCall = () => {
    console.log("Making a call")
    console.log(this.props.recipient)
    this.props.phoneService.makeCall(this.props.recipient)
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
