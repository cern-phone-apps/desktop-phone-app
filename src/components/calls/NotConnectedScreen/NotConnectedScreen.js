import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Button, Loader, Message, Segment} from 'semantic-ui-react'

class NotConnectedScreen extends Component {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    requestConnection: PropTypes.func.isRequired,
    errors: PropTypes.object
  }

  connect = () => {
    console.debug('connect')
    this.props.phoneService.connectAgent()
  }

  render () {
    console.debug('props', this.props)
    const {t} = this.props
    return (
      <div className="call-inner-content">
        <h2 className="ui center aligned header gray-text">{t('disconnected.header')}</h2>
        <Segment textAlign={'center'} basic>
          {this.props.errors.message ? <Message color='red'>{this.props.errors.message}</Message> : ''}
          <p>{t('disconnected.text')}</p>
          {!this.props.connecting && <Button onClick={this.connect}>Connect</Button>}
          {this.props.connecting && <Loader active inline='centered'/>}
        </Segment>
      </div>
    )
  }
}

NotConnectedScreen.propTypes = {}

export default translate('calls')(NotConnectedScreen)
