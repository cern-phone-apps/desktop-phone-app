import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {PhoneNumberMenuItemContainer} from 'containers/components/calls'

class PhoneNumbersMenu extends Component {
  render () {
    return (
      <Menu fluid={true} attached={'bottom'} vertical={true}>
        <PhoneNumberMenuItemContainer/>
        <PhoneNumberMenuItemContainer/>
        <PhoneNumberMenuItemContainer/>
      </Menu>
    )
  }
}

PhoneNumbersMenu.propTypes = {}

export default PhoneNumbersMenu
