import React, { Component } from 'react'
import PropTypes from 'prop-types'
import faker from 'faker'
import { Icon, Menu } from 'semantic-ui-react'

class PhoneNumberMenuItem extends Component {
  static propTypes = {
    makeCall: PropTypes.func.isRequired,
    acceptCall: PropTypes.func.isRequired,
    unSelectUser: PropTypes.func.isRequired,
    calling: PropTypes.bool.isRequired
  }

  makeCall = (number) => {
    console.log(`Event target: ${number}`)
    this.props.unSelectUser()
    this.props.makeCall({
      name: 'Test User',
      number: '123456 7890',
      startTime: Date.now()
    })
  }

  render () {
    return (
      <Menu.Item
        onClick={() => {
          this.makeCall(faker.phone.phoneNumber())
        }}>
        <Icon name={'phone'}/> {faker.phone.phoneNumber()}
      </Menu.Item>
    )
  }
}

export default PhoneNumberMenuItem
