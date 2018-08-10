import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon, Menu} from 'semantic-ui-react'
import {buildRecipient} from 'calls/utils'

export class CalleeProfileNumber extends Component {
  static propTypes = {
    unSelectUser: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    recipientName: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    phoneService: PropTypes.object.isRequired
  }

  makeCall = () => {
    const recipient = {
      name: this.props.recipientName,
      phoneNumber: this.props.phoneNumber,
      incoming: false,
      missed: false
    }

    this.props.unSelectUser()
    this.props.phoneService.makeCall(buildRecipient(recipient))
  }

  render () {
    return (
      <Menu.Item
        className={'CalleeProfileNumber'}
        onClick={() => {
          this.makeCall()
        }}
      >
        <Icon name={this.props.icon}/> {this.props.phoneNumber}
      </Menu.Item>
    )
  }
}

export default CalleeProfileNumber
