import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Icon} from 'semantic-ui-react'
import DisconnectModal from 'calls/components/DisconnectNumberButton/DisconnectModal'
import {logMessage} from 'common/utils'


export class DisconnectNumberButton extends Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired,
    disconnecting: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    displayMessage: PropTypes.bool.isRequired,
  }

  disconnect = () => {
    this.props.phoneService.unAuthenticateUser()
  }

  render () {

    const {disconnecting, connected, displayMessage} = this.props

    logMessage(`Disconnecting is ${disconnecting}`)

    return (
      <div>
        <Button disabled={!connected} onClick={this.disconnect}
                title={'Disconnect the current number'}>
          <Icon name={'plug'} color={'red'}/> Disconnect current number
        </Button>
        {(!connected && displayMessage)? <p>You are not connected to TONE</p> : ''}
        <DisconnectModal disconnecting={disconnecting}/>
      </div>
    )
  }
}

export default DisconnectNumberButton
