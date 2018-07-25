import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Dimmer, Header, Icon, Loader, Modal, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import './StatusSwitcher.css'
import {callsRoute} from 'calls/routes'
import {StatusDropdownContainer} from 'calls/containers/components'

const DisconnectModal = ({disconnecting}) => {
  return (<Modal size={'mini'} open={disconnecting}>
    <Modal.Content>
      <Modal.Description>
        <Header textAlign='center'>Disconnecting...</Header>
        <Segment basic>
          <Dimmer active inverted>
            <Loader size='small'/>
          </Dimmer>
        </Segment>
      </Modal.Description>
    </Modal.Content>
  </Modal>)
}

class StatusSwitcher extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    disconnecting: PropTypes.bool.isRequired
  }

  disconnect = () => {
    console.debug('disconnect')
    this.props.phoneService.disconnectAgent()
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
