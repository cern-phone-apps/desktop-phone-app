import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'semantic-ui-react'

import './ToggleButton.css'

export class ToggleButton extends React.Component {
  static propTypes = {
    displaySidebar: PropTypes.func.isRequired,
    finishedDisplayingSidebar: PropTypes.func.isRequired,
    displayTime: PropTypes.number.isRequired
  }

  toggleSidebar = () => {
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
