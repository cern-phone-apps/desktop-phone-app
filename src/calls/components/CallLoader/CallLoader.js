import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CallLoader.css'
import {translate} from 'react-i18next'
import PhoneRingingIcon from 'calls/components/PhoneRingingIcon/PhoneRingingIcon'
import {Grid, Segment} from 'semantic-ui-react'

export class CallLoader extends Component {
  static propTypes = {
    recipientName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    // hangupCall: PropTypes.func.isRequired,
    // acceptCall: PropTypes.func.isRequired,
    calling: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired
  }

  componentDidMount () {
    // TODO Move this to the Dummy API client
    // setTimeout(() => {
    //   console.debug('Accept call after 5 seconds') || this.acceptCall()
    // }, 5000)
  }

  // acceptCall = () => {
  //   console.debug('PROPS', this.props)
  //   if (this.props.calling) {
  //     this.props.acceptCall()
  //   }
  // }

  hangUpCall = () => {
    this.props.phoneService.hangUpCall()
  }

  render () {
    const {t} = this.props

    return (
      <Segment textAlign={'center'} basic>
        <Grid columns={1}>
          <Grid.Column>
            <Segment textAlign={'center'}>
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
                <button onClick={this.hangUpCall} className="ui circular red icon button">
                  <i className="phone icon"/>
                </button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

export default translate('calls')(CallLoader)
