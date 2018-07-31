import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CallLoader.css'
import {translate} from 'react-i18next'
import PhoneRingingIcon from 'calls/components/PhoneRingingIcon/PhoneRingingIcon'

export class CallLoader extends Component {
  static propTypes = {
    recipientName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    hangupCall: PropTypes.func.isRequired,
    acceptCall: PropTypes.func.isRequired,
    calling: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  componentDidMount () {
    setTimeout(() => {
      console.debug('Accept call after 5 seconds') || this.acceptCall()
    }, 5000)
  }

  acceptCall = () => {
    console.debug('PROPS', this.props)
    if (this.props.calling) {
      this.props.acceptCall()
    }
  }

  render () {
    const {t} = this.props

    return (
      <div className="call-inner-content">
        <div className="ui segment">
          <div>
            <div className="ui center aligned basic segment">
              <PhoneRingingIcon/>
            </div>
            <h3 className="ui center aligned header">
              {t('callingText')} <img src={'/images/avatar/patrick.png'} alt={'avatar'}
                className="ui circular tiny image"/> {this.props.recipientName}
            </h3>
            <div className="ui center aligned basic segment">
              ({this.props.phoneNumber})
            </div>
          </div>
          <div className="ui center aligned basic segment">
            <button onClick={() => this.props.hangupCall()} className="ui circular red icon button">
              <i className="phone icon"/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default translate(
  'calls'
)(
  CallLoader
)
