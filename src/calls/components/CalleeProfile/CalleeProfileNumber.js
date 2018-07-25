import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Menu} from 'semantic-ui-react'

class CalleeProfileNumber extends Component {
  static propTypes = {
    makeCall: PropTypes.func.isRequired,
    acceptCall: PropTypes.func.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    calling: PropTypes.bool.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }

  makeCall = () => {
    this.props.unSelectUser()
    this.props.makeCall({
      name: this.props.recipientName,
      number: this.props.phoneNumber,
      startTime: Date.now()
    })
  }

  render () {
    return (
      <Menu.Item
        onClick={() => {
          this.makeCall()
        }}>
        <Icon name={this.props.icon}/> {this.props.phoneNumber}
      </Menu.Item>
    )
  }
}

export default CalleeProfileNumber
