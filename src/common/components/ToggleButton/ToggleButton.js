import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'semantic-ui-react'

import './ToggleButton.css'

class ToggleButton extends Component {
  static propTypes = {
    displaySidebar: PropTypes.func.isRequired,
    finishedDisplayingSidebar: PropTypes.func.isRequired,
    displayTime: PropTypes.number.isRequired
  }

  toggleSidebar = () => {
    console.debug('Calling toggle sidebar')
    this.props.displaySidebar()
    setTimeout(() => {
      this.props.finishedDisplayingSidebar()
    }, this.props.displayTime)
  }

  render () {
    return (
      <Button as={'a'} className={'flat ToggleButton'} icon={'sidebar'} onClick={this.toggleSidebar}/>
    )
  }
}

export default ToggleButton
