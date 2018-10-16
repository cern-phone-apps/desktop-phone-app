import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {Icon, Modal, Header, Button} from 'semantic-ui-react'
import PhoneRingingIcon from 'calls/components/PhoneRingingIcon/PhoneRingingIcon'
import {logMessage} from 'common/utils'

import './CallingModal.css'

const ModalTrigger = ({onClick}) => {
  return (
    <a className={'padded-item CallingMessage'} onClick={onClick} name={'settings'}>
      <Icon name={'phone'}/> {'Receiving a call'} from XXXX
    </a>
  )
}

ModalTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
}

/**
 * Modal to view and manage the application settings
 */
export class CallingModal extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    isReceivingCall: PropTypes.func.isRequired,
    rejectCall: PropTypes.func.isRequired,
    phoneService: PropTypes.object.isRequired,
    connected: PropTypes.bool.isRequired
  }

  inlineStyle = {
    modal: {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }

  ringToneId = 'ringTone'

  state = {modalOpen: false}

  onOpen = () => {
    logMessage("Opening calling modal")
    this.playRingTone()
    this.props.isReceivingCall()
  }

  onClose = () => {
    logMessage("Closing calling modal")
    this.stopRingTone()
    this.setState({modalOpen: false})
  }

  playRingTone = () => {
    document.getElementById(this.ringToneId).play();
  }

  stopRingTone = () => {
    document.getElementById(this.ringToneId).pause();
  }

  rejectCall = () => {
    logMessage('Rejecting call')
    this.setState({modalOpen: false})
    this.stopRingTone()
    this.props.phoneService.rejectCall()
  }

  answerCall = () => {
    this.setState({modalOpen: false})
    this.stopRingTone()
    this.props.phoneService.acceptCall()
  }


  render () {
    const {t, connected} = this.props
    // this fix is needed in order to center the modal on the screen. (Semantic UI bug)

    if (connected) {

      return (
        <Modal size={'tiny'}
               dimmer={'blurring'}
               open={this.state.modalOpen}
               style={this.inlineStyle.modal}
               closeIcon
               onOpen={this.onOpen}
               onClose={this.onClose}
               trigger={<ModalTrigger className={'OnCallMessage'} onClick={() => this.setState({modalOpen: true})}/>}>
          <Modal.Header>{'Receiving an incoming call'}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className="ui center aligned basic segment">
                <PhoneRingingIcon/>
                <Header as={'h3'}>(+ 41 123 123 123)</Header>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.rejectCall}>Reject</Button>
            <Button positive onClick={this.answerCall} icon='phone' labelPosition='right' content='Answer'/>
          </Modal.Actions>
        </Modal>
      )
    }else{
      return ''
    }
  }
}

export default translate('settings')(CallingModal)