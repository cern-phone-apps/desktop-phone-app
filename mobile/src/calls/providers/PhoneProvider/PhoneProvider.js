import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Dial } from '../../../../external/tone-webrtc-api/dial-api';
import {
  errorMessage,
  logMessage,
  toneInMessage,
  toneOutMessage
} from '../../../common/utils/logging';
import * as Sound from '../../utils/sound/Sound';

export class PhoneProvider extends React.Component {
  static propTypes = {
    call: PropTypes.shape({
      onCall: PropTypes.bool.isRequired
    }).isRequired,
    // Functions
    setDisconnectionSuccess: PropTypes.func,
    setIsCalling: PropTypes.func,
    setCallFinished: PropTypes.func,
    acceptOutgoingCall: PropTypes.func,
    addRecentCall: PropTypes.func,
    requestRegistration: PropTypes.func.isRequired,
    setRegistrationSuccess: PropTypes.func.isRequired,
    requestDisconnection: PropTypes.func.isRequired,
    setMakeCallRequest: PropTypes.func.isRequired,
    setIsReceivingCall: PropTypes.func.isRequired,
    setCallAccepted: PropTypes.func.isRequired,
    setCallFailed: PropTypes.func.isRequired
  };

  static defaulProps = {};

  state = {
    phoneService: this,
    phoneNumber: '',
    startTime: ''
  };

  static childContextTypes = {
    phoneService: PropTypes.object.isRequired
  };

  getChildContext() {
    return { phoneService: this.state.phoneService };
  }

  /**
   * Class functionality
   */

  /**
   * When the component is mounted we load Dial
   */
  componentDidMount() {
    const dial = new Dial();
    this.setState(
      {
        dialAPI: dial
      },
      () => {
        this.addListeners();
      }
    );
  }

  addListeners = () => {
    const { dialAPI } = this.state;
    this.notifier = dialAPI.getNotifier();
    if (this.notifier) {
      this.notifier.on('ToneEvent', event => {
        this.eventHandler(event);
      });
    }
  };

  /**
   * Authenticates the user using the Telephony API
   * @param phoneNumber
   * @returns {boolean|void|*}
   */
  registerUser = (phoneNumber, token) => {
    const { requestRegistration } = this.props;
    const { dialAPI } = this.state;

    this.setState({ phoneNumber });
    requestRegistration();
    dialAPI.authenticate(phoneNumber, token);
  };

  disconnectUser = async () => {
    const {
      requestDisconnection,
      setDisconnectionSuccess,
      call: onCall
    } = this.props;
    const { dialAPI } = this.state;

    toneOutMessage(`UnAuthenticating user`);

    this.setState({ phoneNumber: '' });

    if (onCall === true) {
      logMessage('Hanging up current call');
      this.hangupCurrentCall();
    }
    await requestDisconnection(true);

    try {
      dialAPI.stopAgent();
    } catch (error) {
      errorMessage(`Agent is not connected`);
      setDisconnectionSuccess();
    }
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = (name = 'Unknown', phoneNumber) => {
    const { setMakeCallRequest, setIsCalling } = this.props;
    const { dialAPI } = this.state;

    toneOutMessage(`Calling user ${name} with number ${phoneNumber}`);
    setMakeCallRequest({
      name,
      phoneNumber
    });
    try {
      dialAPI.call(phoneNumber);
      return true;
    } catch (error) {
      errorMessage(error);
      setIsCalling(false);
      return false;
    }
  };

  hangupCurrentCall = () => {
    const { dialAPI } = this.state;
    toneOutMessage(`Hang up current call`);
    return dialAPI.hangUp();
  };

  acceptIncomingCallAction = () => {
    const { dialAPI } = this.state;
    toneOutMessage(`Accepting incoming call`);
    dialAPI.answer();
  };

  addCallToRecentCalls = () => {
    logMessage(`addCallToRecentCalls`);
    const {
      addRecentCall,
      call: { recipient, caller, receivingCall, startTime, onCall }
    } = this.props;
    addRecentCall(
      receivingCall ? caller : recipient,
      receivingCall,
      !onCall,
      startTime
    );
  };

  /**
   * When the user connects to tone, we trigger a redux action to set the
   * state as connected
   */
  handleRegisteredEvent = () => {
    const { setRegistrationSuccess } = this.props;
    setRegistrationSuccess();
  };

  /**
   * When we receive a disconnected event, we update the redux state
   */
  handleUnregisteredEvent = () => {
    const { setDisconnectionSuccess } = this.props;
    setDisconnectionSuccess();
  };

  /**
   * Terminated is received every time a call is terminated, no matter if it was
   * successful or it failed
   */
  handleTerminatedEvent = () => {
    const { setCallFinished, call: caller } = this.props;
    this.addCallToRecentCalls(caller.missed);
    setCallFinished();
  };

  /**
   * When we receive an inviteReceivedEvent, we want to play a ringtone and
   * update the redux state
   * @param event
   */
  handleInviteReceivedEvent = event => {
    Sound.playReceivingCallTone();
    const { setIsReceivingCall } = this.props;
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    setIsReceivingCall(uri.normal.user, null);
  };

  /**
   * When a call is accepted, we stop all the sounds and start the call timer
   */
  handleAcceptedEvent = () => {
    const { setCallAccepted } = this.props;
    Sound.stop();
    this.setState({
      startTime: Date.now()
    });
    setCallAccepted();
  };

  rejectIncomingCall = () => {
    const { dialAPI } = this.state;
    dialAPI.hangUp();
  };

  handleRejectedEvent = () => {
    const { setCallMissed } = this.props;

    Sound.stop();
    setCallMissed();
  };

  handleFailedEvent = () => {
    // TODO
    const { setCallFailed } = this.props;
    const tempFailedMessage = {
      code: {
        status_code: 'NI'
      },
      description: 'Call failed'
    };
    setCallFailed(tempFailedMessage);
  };

  testFunction = () => {
    console.log('Hello World');
  };

  handleProgressEvent = () => {
    const { setIsCalling } = this.props;

    console.log('Call in progress...');
    Sound.playMakingCallTone();
    setIsCalling(true);
  };

  handleCancelEvent = () => {
    Sound.stop();
  };

  eventHandler = event => {
    toneInMessage(`Tone Event received: ${event.name}`);
    toneInMessage(event);

    switch (event.name) {
      // The user registered a phone number. He is able to make/receive calls
      case 'registered':
        this.handleRegisteredEvent();
        break;
      // The user is unregistered. He is no longer able to make/receive calls
      case 'unregistered':
        this.handleUnregisteredEvent();
        break;
      // The call is finished
      case 'terminated':
        this.handleTerminatedEvent();
        break;
      case 'accepted':
        this.handleAcceptedEvent();
        break;
      case 'rejected':
        this.handleRejectedEvent();
        break;
      case 'inviteReceived':
        this.handleInviteReceivedEvent(event);
        break;
      case 'failed':
        this.handleFailedEvent();
        break;
      //
      // case 'bye':
      //   this.handleByeEvent();
      //   break;

      case 'progress':
        this.handleProgressEvent();
        break;

      case 'cancel':
        this.handleCancelEvent();
        break;

      default:
        errorMessage(`Unhandled event: ${event.name}`);
    }
  };

  render() {
    const { children } = this.props;
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(children);
  }
}

export default PhoneProvider;
