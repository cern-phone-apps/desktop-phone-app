import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Dial } from 'tone-api-mobile';
import { Alert } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import uuid4 from 'uuid/v4';

import {
  errorMessage,
  logMessage,
  toneInMessage,
  toneOutMessage
} from '../../../common/utils/logging';

const displayErrorAlert = (header = 'Error', message) => {
  Alert.alert(header, message, [
    {
      text: 'Close',
      style: 'cancel'
    }
  ]);
};

const options = {
  ios: {
    appName: 'CERN Phone App'
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok'
  }
};

export class PhoneProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // tokens
    authToken: PropTypes.string,
    toneToken: PropTypes.string.isRequired,
    // call info
    call: PropTypes.shape({
      additionalCalls: PropTypes.number.isRequired,
      remote: PropTypes.shape({}),
      tempRemote: PropTypes.shape({
        name: PropTypes.string,
        phoneNumber: PropTypes.string,
        incoming: PropTypes.bool
      }),
      startTime: PropTypes.number,
      onCall: PropTypes.bool,
      receivingCall: PropTypes.bool.isRequired,
      missed: PropTypes.bool.isRequired,
      uuid: PropTypes.string
    }),
    // state setters
    setToneToken: PropTypes.func.isRequired,
    setRegistrationSuccess: PropTypes.func.isRequired,
    setIsCalling: PropTypes.func.isRequired,
    setIsReceivingCall: PropTypes.func.isRequired,
    setCallFinished: PropTypes.func.isRequired,
    setCallFailed: PropTypes.func.isRequired,
    setCallMissed: PropTypes.func.isRequired,
    setCallAccepted: PropTypes.func.isRequired,
    setMakeCallRequest: PropTypes.func.isRequired,
    setDisconnectionSuccess: PropTypes.func.isRequired,
    // actions
    requestRegistration: PropTypes.func.isRequired,
    requestDisconnection: PropTypes.func.isRequired,
    addRecentCall: PropTypes.func.isRequired,
    addAdditionalCall: PropTypes.func.isRequired,
    removeAdditionalCall: PropTypes.func.isRequired,
    clearAuthToken: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    call: {},
    authToken: ''
  };

  state = {
    phoneService: this
  };

  static childContextTypes = {
    phoneService: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired,
      makeCall: PropTypes.func.isRequired
    }).isRequired
  };

  getChildContext() {
    const { phoneService } = this.state;
    return { phoneService };
  }

  /**
   * Class functionality
   */

  /**
   * When the component is mounted we load Dial
   */
  componentDidMount() {
    const dial = new Dial();
    RNCallKeep.setup(options);
    this.setState(
      {
        toneAPI: dial
      },
      () => {
        this.addListeners();
        RNCallKeep.addEventListener(
          'didReceiveStartCallAction',
          this.onNativeCall
        );
        RNCallKeep.addEventListener('answerCall', () => {
          logMessage('Received answerCall event');
          this.onAnswerCallAction();
        });
        RNCallKeep.addEventListener('endCall', this.hangUpCurrentCallAction);
        RNCallKeep.addEventListener(
          'didDisplayIncomingCall',
          this.onIncomingCallDisplayed
        );
      }
    );
  }

  addListeners = () => {
    const { toneAPI } = this.state;
    this.notifier = toneAPI.getNotifier();
    if (this.notifier) {
      this.notifier.on('ToneEvent', event => {
        this.eventHandler(event);
      });
    }
  };

  getCurrentCallId = () => {
    if (!this.currentCallId) {
      this.currentCallId = uuid4();
    }

    return this.currentCallId;
  };

  /**
   * Authenticates the user using the Telephony API
   * @param phoneNumber
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

  disconnectUser = async () => {
    const {
      requestDisconnection,
      setDisconnectionSuccess,
      call: onCall
    } = this.props;
    const { toneAPI } = this.state;

    toneOutMessage(`UnAuthenticating user`);

    if (onCall === true) {
      logMessage('Hanging up current call');
      this.hangUpCurrentCallAction();
    }
    await requestDisconnection(true);

    try {
      toneAPI.stopAgent();
    } catch (error) {
      errorMessage(`Agent is not connected`);
    }
    await setDisconnectionSuccess();
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = (name = 'Unknown', phoneNumber) => {
    const { setMakeCallRequest, setIsCalling } = this.props;
    const { toneAPI } = this.state;

    logMessage('makeCall has been called');
    setMakeCallRequest(
      {
        name,
        phoneNumber
      },
      this.getCurrentCallId()
    );
    setIsCalling();
    // RNCallKeep.startCall(this.getCurrentCallId(), phoneNumber);
    toneAPI.call(phoneNumber);
  };

  onNativeCall = ({ handle }) => {
    const { toneAPI } = this.state;

    // Your normal start call action
    logMessage('Calling onNativeCall');
    // RNCallKeep.startCall('12345', handle);
    toneAPI.call(handle);
  };

  hangUpCurrentCallAction = () => {
    const {
      call: { uuid }
    } = this.props;
    const { toneAPI } = this.state;
    toneOutMessage(`Hang up current call`);
    RNCallKeep.endCall(uuid);
    return toneAPI.hangUp();
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const { setCallFinished } = this.props;
    // logEvent("calls", `hangUp`, `remote: ${username}.`);
    setCallFinished();
  };

  onAnswerCallAction = () => {
    // called when the user answers the incoming call
    this.answer();
  };

  answer = () => {
    const { toneAPI } = this.state;
    toneOutMessage(`Accepting incoming call`);
    RNCallKeep.setCurrentCallActive();
    toneAPI.answer();
  };

  sendDtmfCommand = tone => {
    const { toneAPI } = this.state;
    toneAPI.sendDTMF(tone);
  };

  receiveCall = ({ callerNumber, callerName }) => {
    const { setIsReceivingCall } = this.props;
    logMessage('Is receiving call');
    // Sound.playRingTone();
    setIsReceivingCall(callerNumber, callerName);
  };

  /**
   * Method that must be called when an incoming call is rejected.
   * It performs all the actions needed by this action.
   */
  rejectIncomingCall = () => {
    const { toneAPI } = this.state;
    logMessage('PhoneProvider -> rejectIncomingCall');
    RNCallKeep.endCall(this.getCurrentCallId());
    toneAPI.hangUp();
  };

  // acceptIncomingCallAction = () => {
  //   const { toneAPI } = this.state;
  //   toneOutMessage(`Accepting incoming call`);
  //   toneAPI.answer();
  // };

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

    let isMissed = onCall;
    let incoming = false;
    let tempRemote;

    if (remoteToAdd) {
      tempRemote = remoteToAdd;
      // It's not the current ongoing call
      if (additionalCalls > 0) {
        isMissed = true;
        incoming = true;
      } else {
        isMissed = missed;
      }
    } else {
      tempRemote = remote;
      isMissed = !onCall;
    }

    logMessage(tempRemote);
    logMessage(`Receiving call: ${receivingCall}`);
    logMessage(`Is missed? ${isMissed}`);
    logMessage(startTime);

    addRecentCall(remoteToAdd, incoming, isMissed, startTime);
  };

  /**
   * When the user connects to tone, we trigger a redux action to set the
   * state as connected
   */
  handleRegisteredEvent = () => {
    const { setRegistrationSuccess } = this.props;
    setRegistrationSuccess();
    RNCallKeep.setAvailable(true);
  };

  /**
   * When we receive a disconnected event, we update the redux state
   */
  handleUnregisteredEvent = () => {
    const { setDisconnectionSuccess } = this.props;
    setDisconnectionSuccess();
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

  /**
   * Terminated is received every time a call is terminated, no matter if it was
   * successful or it failed
   */
  handleTerminatedEvent = () => {
    const {
      setCallFinished,
      call: { additionalCalls, tempRemote, remote, onCall },
      removeAdditionalCall
    } = this.props;
    logMessage(`additionalCalls: ${additionalCalls}`);
    if (additionalCalls > 0) {
      removeAdditionalCall();
      this.addCallToRecentCalls(tempRemote);
      setCallFinished(true, remote);
    } else {
      this.addCallToRecentCalls(onCall ? remote : tempRemote);
      setCallFinished();
    }
    RNCallKeep.endCall(this.getCurrentCallId());
  };

  /**
   * When we receive an inviteReceivedEvent, we want to play a ringtone and
   * update the redux state
   * @param event
   */
  handleInviteReceivedEvent = event => {
    const {
      setIsReceivingCall,
      call: { onCall },
      addAdditionalCall
    } = this.props;
    logMessage(`handleInviteReceivedEvent with onCall: ${onCall}`);
    logMessage(onCall);
    if (onCall) {
      addAdditionalCall();
    }
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    const phoneNumber = uri.user;
    setIsReceivingCall(phoneNumber, null, this.getCurrentCallId());
    RNCallKeep.displayIncomingCall(this.getCurrentCallId(), phoneNumber);
  };

  /**
   * When a call is accepted, we stop all the sounds and start the call timer
   */
  handleAcceptedEvent = () => {
    const { setCallAccepted } = this.props;
    // Sound.stop();
    setCallAccepted();
    RNCallKeep.setCurrentCallActive();

    // RNCallKeep.startCall('12345', '65508');
  };

  handleRejectedEvent = () => {
    const { setCallMissed } = this.props;

    // Sound.stop();
    setCallMissed();
  };

  handleFailedEvent = () => {
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
    // Sound.playRingbackTone();
    setIsCalling(true);
  };

  handleCancelEvent = () => {
    // Sound.stop();
  };

  handleRegistrationFailedEvent = () => {
    displayErrorAlert(
      'Error',
      'Unable to register the selected number. Please, logout and try again in a few minutes.'
    );
  };

  onIncomingCallDisplayed = () => {
    logMessage('Calling onIncomingCallDisplayed');
    // You will get this event after RNCallKeep finishes showing incoming call UI
    // You can check if there was an error while displaying
  };

  /**
   * =======
   * EVENTS
   * =======
   */

  eventHandler = event => {
    toneInMessage(`Tone Event received: ${event.name}`);
    toneInMessage(event);

    const handler = {
      registered: this.handleRegisteredEvent,
      registrationFailed: this.handlRegistrationFailedEvent,
      unregistered: this.handleUnregisteredEvent,
      terminated: this.handleTerminatedEvent,
      accepted: this.handleAcceptedEvent,
      rejected: this.handleRejectedEvent,
      inviteReceived: this.handleInviteReceivedEvent,
      failed: this.handleFailedEvent,
      progress: this.handleProgressEvent,
      cancel: this.handleCancelEvent
    }[event.name];

    if (handler) {
      handler(event);
    } else {
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
