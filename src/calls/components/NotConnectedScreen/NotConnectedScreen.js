import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Segment} from 'semantic-ui-react'
import ConnectNumberButtonContainer from 'calls/containers/components/ConnectNumberButton/ConnectNumberButtonContainer'
import ErrorMessageContainer from 'common/containers/components/ErrorMessage/ErrorMessageContainer'

export class NotConnectedScreen extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props
    return (
      <div className="call-inner-content">
        <h2 className="ui center aligned header gray-text">{t('disconnected.header')}</h2>
        <Segment textAlign={'center'} basic>
          <ErrorMessageContainer/>
          <p>{t('disconnected.text')}</p>
          <ConnectNumberButtonContainer/>
        </Segment>
      </div>
    )
  }
}

export default translate('calls')(NotConnectedScreen)
