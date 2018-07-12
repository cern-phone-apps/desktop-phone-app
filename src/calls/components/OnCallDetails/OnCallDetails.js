import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './OnCallDetails.css'
import Timer from 'simple-react-timer'
import {Link} from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'
import {translate} from 'react-i18next'

class OnCallDetails extends Component {
  static propTypes = {
    hangupCall: PropTypes.func.isRequired,
    startTime: PropTypes.number.isRequired,
    addRecentCall: PropTypes.func.isRequired,
    recipient: PropTypes.object.isRequired,
    receivingCall: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  buildRecentCall = () => {
    return {
      author: this.props.recipient.name,
      incoming: this.props.receivingCall,
      phoneNumber: this.props.recipient.number,
      missed: false,
      startTime: this.props.startTime,
      endTime: Date.now()
    }
  }

  hangup = () => {
    console.error(this.props)
    this.props.addRecentCall(this.buildRecentCall())
    this.props.hangupCall()
  }

  render () {
    const {t} = this.props
    return (

      <div className="call-inner-content">
        <div className="ui segment">
          <div>
            <h3 className="ui center aligned header">{t('onCallWithText')}</h3>
            <h2 className="ui center aligned header">
              <Icon name={'user'}/> {this.props.recipient.name}
            </h2>
            <div className="ui center aligned basic segment">
              <Timer startTime={this.props.startTime}/>
            </div>
            <div className="ui center aligned basic segment">
              <button
                onClick={() => this.hangup()}
                className="ui circular red icon button">
                <i className="phone icon"/>
              </button>
              <button className="ui circular icon button">
                <i className="mute icon"/>
              </button>
              <Button as={Link} to={'/chat'} circular icon={'comment'}/>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default translate('calls')(OnCallDetails)
