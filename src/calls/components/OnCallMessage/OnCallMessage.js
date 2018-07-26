import React, {Component} from 'react'

import './OnCallMessage.css'
import PropTypes from 'prop-types'
import Timer from 'simple-react-timer'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'

export class OnCallMessage extends Component {
  static propTypes = {
    recipientName: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired
  }

  render () {
    const {t} = this.props
    return (
      <Link to={'/'} className={'padded-item OnCallMessage'}>
        <Timer startTime={this.props.startTime}/> - {t('onCallWithText')} {this.props.recipientName}
      </Link>
    )
  }
}

export default translate('calls')(OnCallMessage)
