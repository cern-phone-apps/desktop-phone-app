import React, { Component } from 'react'
import moment from 'moment'

import './OnCallMessage.css'
import PropTypes from 'prop-types'
import Timer from 'simple-react-timer'
import { Link } from 'react-router-dom'

class OnCallMessage extends Component {
  static propTypes = {
    recipientName: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired
  }

  render () {
    console.log(moment.duration(100))
    return (
      <Link to={'/'} className={'padded-item OnCallMessage'}>
        <Timer startTime={this.props.startTime}/> - On call with {this.props.recipientName}
      </Link>
    )
  }
}

export default OnCallMessage
