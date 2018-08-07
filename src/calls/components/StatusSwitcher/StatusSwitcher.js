import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './StatusSwitcher.css'
import {callsRoute} from 'calls/routes'
import StatusDropdownContainer from 'calls/containers/components/StatusDropdown/StatusDropdownContainer'
import DisconnectModal from 'calls/components/StatusSwitcher/DisconnectModal'

export class StatusSwitcher extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    disconnecting: PropTypes.bool.isRequired,
    phoneService: PropTypes.object.isRequired
  }

  disconnect = () => {
    this.props.phoneService.unAuthenticateUser()
  }

  render () {
    if (!this.props.connected) {
      return (
        <div className={'ToggleButtonContainer'}>
          <Button className={'flat ToggleButton'}>
            <Link to={callsRoute.path}><Icon name={'plug'}/></Link>
          </Button>
        </div>
      )
    }

    return (
      <div>
        <StatusDropdownContainer disconnect={this.disconnect}/>
        <DisconnectModal {...this.props}/>
      </div>
    )
  }
}

export default StatusSwitcher
