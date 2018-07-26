import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Message, Segment} from 'semantic-ui-react'
import ConnectNumberButtonContainer from 'calls/containers/components/ConnectNumberButton/ConnectNumberButtonContainer'


export class NotConnectedScreen extends Component {
  static propTypes = {
    errors: PropTypes.object
  }

  render () {
    const {t} = this.props
    return (
      <div className="call-inner-content">
        <h2 className="ui center aligned header gray-text">{t('disconnected.header')}</h2>
        <Segment textAlign={'center'} basic>
          {this.props.errors.message ? <Message color='red'>{this.props.errors.message}</Message> : ''}
          <p>{t('disconnected.text')}</p>
          <ConnectNumberButtonContainer/>
        </Segment>
      </div>
    )
  }
}

NotConnectedScreen.propTypes = {}

export default translate('calls')(NotConnectedScreen)
