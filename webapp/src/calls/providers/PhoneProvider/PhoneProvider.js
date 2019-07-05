import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { Dial } from 'tone-api-web';

import {
  errorMessage,
  infoMessage,
  logEvent,
  logMessage,
  toneInMessage,
  toneOutMessage
} from 'common/utils/logs';

const electron = window.require('electron');
const { ipcRenderer } = electron;

const ringToneId = 'ringTone';
const ringBackToneId = 'ringbackTone';
const callInputId = 'callsAudioInput';

/**
 * Interfaces between Telephony API and UI
 */
export default class PhoneProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // Calls attrs
    authToken: PropTypes.string,
    doNotDisturb: PropTypes.bool.isRequired,
    call: PropTypes.shape({
      remote: PropTypes.shape({}),
      startTime: PropTypes.number,
      onCall: PropTypes.bool
    }),
    // Calls funcs
    requestRegistration: PropTypes.func.isRequired,
    setRegistrationSuccess: PropTypes.func.isRequired,
    requestDisconnection: PropTypes.func.isRequired,
    setMakeCallRequest: PropTypes.func.isRequired,
    setIsCalling: PropTypes.func.isRequired,
    setIsReceivingCall: PropTypes.func.isRequired,
    setCallFailed: PropTypes.func.isRequired,
    addRecentCall: PropTypes.func.isRequired,
    setCallFinished: PropTypes.func.isRequired,
    setCallMissed: PropTypes.func.isRequired,
    setCallAccepted: PropTypes.func.isRequired,
    setDisconnectionSuccess: PropTypes.func.isRequired,
    setRegistrationFailure: PropTypes.func.isRequired,
    addAdditionalCall: PropTypes.func.isRequired,
    removeAdditionalCall: PropTypes.func.isRequired,
    // Notifications
    success: PropTypes.func.isRequired,
    info: PropTypes.func,
    warning: PropTypes.func
  };

  static defaultProps = {
    call: {}
  };

  static childContextTypes = {
    phoneService: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired,
      makeCall: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    phoneService: this
  };

  registeredNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: 'You are connected now',
    position: 'tr',
    autoDismiss: 2
  };

  unRegisteredNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: 'You have been disconnected',
    message: `You won't be able to make or receive any calls until you connect again`,
    position: 'tr',
    autoDismiss: 4
  };

  callTerminatedNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: 'The call was terminated',
    position: 'tr',
    autoDismiss: 2
  };

  getChildContext() {
    const { phoneService } = this.state;
    return { phoneService };
  }

  componentDidMount() {
    this.audioElement = document.getElementById(callInputId);
    this.setState(
      {
        toneAPI: new Dial(this.audioElement)
      },
      () => {
        this.addListeners();
      }
    );
  }

  /**
   * Only for testing purposes.
   */
  sayHi = () => {
    logMessage('Hello!');
  };

  acceptIncomingCall = () => {
    const { toneAPI } = this.state;
    toneOutMessage(`Accepting incoming call`);
    toneAPI.answer();
  };

  addListeners = () => {
    const { toneAPI } = this.state;

    this.notifier = toneAPI.getNotifier();
    if (this.notifier) {
      this.notifier.on('ToneEvent', event => {
        this.eventHandler(event);
      });
    }
  };

  /**
   * Authenticates the user using the Telephony API
   * @param username
   * @returns {boolean|void|*}
   */
  authenticateUser = username => {
    const {
      authToken,
      requestRegistration,
      setToneToken,
      toneToken,
      clearAuthToken,
      logout
    } = this.props;
    const { toneAPI } = this.state;

    logEvent('calls', `authenticate`, `user: ${username}.`);
    toneOutMessage(`Authenticating user: ${username}/*****`);
    requestRegistration();
    /**
     * If there is an authToken, we use that token. Else, we use the already encrypted token provided by the api
     */
    let tempToken;
    if (authToken) {
      tempToken = authToken;
    } else {
      tempToken = toneToken;
    }
    try {
      const eToken = toneAPI.authenticate(username, tempToken);
      if (authToken) {
        /**
         * If the authToken was used, we clear the original auth token as we will use the encrypted token from now on.
         */
        clearAuthToken();
        logMessage('eToken is');
        logMessage(eToken);
        setToneToken(eToken);
      }
    } catch (error) {
      errorMessage(error);
      logout();
    }
  };

  hangUpCurrentCallAction = () => {
    const { toneAPI } = this.state;
    toneOutMessage(`Hang up current call`);
    return toneAPI.hangUp();
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const { setCallFinished } = this.props;
    // logEvent("calls", `hangUp`, `remote: ${username}.`);
    setCallFinished();
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = ({ name, phoneNumber }) => {
    const { setMakeCallRequest, setIsCalling } = this.props;
    const { toneAPI } = this.state;

    setMakeCallRequest({
      name,
      phoneNumber
    });
    this.playRingbacktone();
    setIsCalling();
    return toneAPI.call(phoneNumber);
  };

  playRingbacktone = () => {
    document
      .getElementById(ringBackToneId)
      .play()
      .catch(() => {
        errorMessage('RingbackTone play() raised an error.');
      });
  };

  playRingTone = () => {
    const { doNotDisturb } = this.props;
    if (!doNotDisturb) {
      document
        .getElementById(ringToneId)
        .play()
        .catch(() => {
          errorMessage('RingTone play() raised an error.');
        });
    }
  };

  sendDtmfCommand = tone => {
    const { toneAPI } = this.state;
    toneAPI.sendDTMF(tone);
  };

  stopRingbacktone = () => {
    document.getElementById(ringBackToneId).pause();
  };

  stopRingTone = () => {
    const { doNotDisturb } = this.props;
    if (!doNotDisturb) {
      document.getElementById(ringToneId).pause();
    }
  };

  receiveCall = ({ callerNumber, callerName }) => {
    const { setIsReceivingCall } = this.props;
    logMessage('Is receiving call');
    this.playRingTone();
    setIsReceivingCall(callerNumber, callerName);
  };

  /**
   * Method that must be called when an incoming call is rejected.
   * It performs all the actions needed by this action.
   */
  rejectIncomingCall = () => {
    const { toneAPI } = this.state;
    toneAPI.hangUp();
  };

  /**
   * Logs the user out of TONE
   */
  unAuthenticateUser = () => {
    const { setCallFinished, requestDisconnection, call: onCall } = this.props;
    const { toneAPI } = this.state;
    toneOutMessage(`UnAuthenticating user`);

    if (onCall) {
      setCallFinished();
    }
    requestDisconnection(true);
    return toneAPI.stopAgent();
  };

  addCallToRecentCalls = (remoteToAdd = null) => {
    logMessage(`addCallToRecentCalls`);
    const {
      addRecentCall,
      call: {
        remote,
        receivingCall,
        startTime,
        onCall,
        additionalCalls,
        missed
      }
    } = this.props;

    let tempRemote = remote;
    let isMissed = onCall;
    let incoming = false;

    if (remoteToAdd) {
      tempRemote = remoteToAdd;
      // It's not the current onfoing call
      if (additionalCalls > 0) {
        isMissed = true;
        incoming = true;
      } else {
        isMissed = missed;
      }
    } else {
      isMissed = !onCall;
    }

    logMessage(tempRemote);
    logMessage(`Receiving call: ${receivingCall}`);
    logMessage(`Is missed? ${isMissed}`);
    logMessage(startTime);

    addRecentCall(remoteToAdd, incoming, isMissed, startTime);
  };

  handleProgressEvent = () => {
    const { setIsCalling } = this.props;
    this.playRingbacktone();
    setIsCalling(true);
  };

  handleCancelEvent = () => {
    this.stopRingbacktone();
    this.stopRingTone();
  };

  /**
   * =======
   * EVENTS
   * =======
   */

  eventHandler = event => {
    toneInMessage(`Tone Event received: ${event.name}`);
    toneInMessage(event);

    switch (event.name) {
      case 'registered':
        this.handleRegisteredEvent();
        break;
      case 'unregistered':
        this.handleUnregisteredEvent();
        break;
      case 'terminated':
        this.handleTerminatedEvent();
        break;
      case 'accepted':
        this.handleAcceptedEvent();
        break;
      case 'rejected':
        // TODO: Detail doesn't include error field nor error code
        this.handleRejectedEvent();
        break;
      case 'inviteReceived':
        this.handleInviteReceivedEvent(event);
        break;
      case 'failed':
        this.handleCallFailedEvent();
        break;
      case 'progress':
        this.handleProgressEvent();
        break;
      case 'trackAdded':
        this.handleTrackAddedEvent(event);
        break;

      case 'cancel':
        this.handleCancelEvent();
        break;

      case 'registrationFailed':
        this.handleRegistationFailedEvent(event);
        break;
      default:
        errorMessage(`Unhandled event: ${event.name}`);
    }
  };

  handleRegisteredEvent() {
    const { setRegistrationSuccess } = this.props;
    setRegistrationSuccess();
  }

  handleInviteReceivedEvent(event) {
    const {
      setIsReceivingCall,
      call: { onCall },
      addAdditionalCall
    } = this.props;
    logMessage(`handleInviteReceivedEvent with onCall: ${onCall}`);
    logMessage(onCall);
    if (onCall) {
      addAdditionalCall();
    } else {
      this.playRingTone();
    }
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    setIsReceivingCall(uri.user, null);
    if (this.props.doNotDisturb) {
      new Notification("You are receiving a call.", { requireInteraction: true, timeout: 60 });
    }
    ipcRenderer.sendSync('synchronous-message', 'receiveCall', this.props.doNotDisturb);
  }

  handleRejectedEvent() {
    const { setCallMissed } = this.props;
    this.stopRingbacktone();
    this.stopRingTone();
    setCallMissed();
  }

  handleAcceptedEvent() {
    const { setCallAccepted } = this.props;
    this.stopRingbacktone();
    this.stopRingTone();
    setCallAccepted();
  }

  handleTerminatedEvent() {
    const {
      setCallFinished,
      call: { additionalCalls, tempRemote, remote, onCall },
      removeAdditionalCall
    } = this.props;
    logMessage(`additionalCalls`);
    logMessage(additionalCalls);
    if (additionalCalls > 0) {
      removeAdditionalCall();
      this.addCallToRecentCalls(tempRemote);
      setCallFinished(true, remote);
    } else {
      const tempRemoteToAdd = onCall ? remote : tempRemote;
      this.addCallToRecentCalls(tempRemoteToAdd);
      setCallFinished();
    }
  }

  handleUnregisteredEvent() {
    const { setDisconnectionSuccess } = this.props;
    setDisconnectionSuccess();
  }

  handleRegistationFailedEvent(event) {
    const { setRegistrationFailure } = this.props;
    if (event.error !== undefined) {
      setRegistrationFailure(event.error);
    }
  }

  handleCallFailedEvent() {
    const { setCallFailed } = this.props;
    const tempFailedMessage = {
      code: {
        status_code: 'NI'
      },
      description: 'Call failed'
    };
    setCallFailed(tempFailedMessage);
  }

  handleTrackAddedEvent(event) {
    this.audioElement.srcObject = event.data.remoteStream;
    const playPromise = this.audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          infoMessage('On a call. Audio track playing');
        })
        .catch(error => {
          errorMessage('Unable to play the audio track.');
          errorMessage(error);
        });
    }
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}
