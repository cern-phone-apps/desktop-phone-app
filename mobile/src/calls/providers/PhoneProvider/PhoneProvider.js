import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Dial } from 'tone-api-mobile';
import { Alert } from 'react-native';
import {
  errorMessage,
  logMessage,
  toneInMessage,
  toneOutMessage
} from '../../../common/utils/logging';

import * as Sound from '../../utils/sound/Sound';

const displayErrorAlert = (header = 'Error', message) => {
  Alert.alert(header, message, [
    {
      text: 'Close',
      style: 'cancel'
    }
  ]);
};

export class PhoneProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    authToken: PropTypes.string,
    doNotDisturb: PropTypes.bool.isRequired,
    call: PropTypes.shape({
      caller: PropTypes.shape({}),
      startTime: PropTypes.number,
      onCall: PropTypes.bool
    }),
    // Functions
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
    removeAdditionalCall: PropTypes.func.isRequired
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
    this.setState(
      {
        toneAPI: dial
      },
      () => {
        this.addListeners();
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
    const { toneAPI } = this.state;

    setMakeCallRequest({
      name,
      phoneNumber
    });
    Sound.playRingbackTone();
    setIsCalling();
    return toneAPI.call(phoneNumber);
  };

  hangUpCurrentCallAction = () => {
    const { toneAPI } = this.state;
    toneOutMessage(`Hang up current call`);
    return toneAPI.hangUp();
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const { setCallFinished } = this.props;
    // logEvent("calls", `hangUp`, `caller: ${username}.`);
    setCallFinished();
  };

  sendDtmfCommand = tone => {
    const { toneAPI } = this.state;
    toneAPI.sendDTMF(tone);
  };

  receiveCall = ({ callerNumber, callerName }) => {
    const { setIsReceivingCall } = this.props;
    logMessage('Is receiving call');
    Sound.playRingTone();
    setIsReceivingCall(callerNumber, callerName);
  };

  /**
   * Method that must be called when an incoming call is rejected.
   * It performs all the actions needed by this action.
   */
  rejectIncomingCall = () => {
    const { toneAPI } = this.state;
    logMessage('PhoneProvider -> rejectIncomingCall');
    toneAPI.hangUp();
  };

  acceptIncomingCallAction = () => {
    const { toneAPI } = this.state;
    toneOutMessage(`Accepting incoming call`);
    toneAPI.answer();
  };

  addCallToRecentCalls = (callerToAdd = null) => {
    logMessage(`addCallToRecentCalls`);
    const {
      addRecentCall,
      call: {
        caller,
        receivingCall,
        startTime,
        onCall,
        additionalCalls,
        missed
      }
    } = this.props;

    let tempCaller = caller;
    let isMissed = onCall;
    let incoming = false;

    if (callerToAdd) {
      tempCaller = callerToAdd;
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

    logMessage(tempCaller);
    logMessage(`Receiving call: ${receivingCall}`);
    logMessage(`Is missed? ${isMissed}`);
    logMessage(startTime);

    addRecentCall(callerToAdd, incoming, isMissed, startTime);
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
      call: { additionalCalls, tempCaller, caller, onCall },
      removeAdditionalCall
    } = this.props;
    logMessage(`additionalCalls`);
    logMessage(additionalCalls);
    if (additionalCalls > 0) {
      removeAdditionalCall();
      this.addCallToRecentCalls(tempCaller);
      setCallFinished(true, caller);
    } else {
      let tempCallerToAdd = null;
      if (!onCall) {
        tempCallerToAdd = tempCaller;
      } else {
        tempCallerToAdd = caller;
      }

      this.addCallToRecentCalls(tempCallerToAdd);
      setCallFinished();
    }
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
    } else {
      Sound.playRingTone();
    }
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    setIsReceivingCall(uri.user, null);
  };

  /**
   * When a call is accepted, we stop all the sounds and start the call timer
   */
  handleAcceptedEvent = () => {
    const { setCallAccepted } = this.props;
    Sound.stop();
    setCallAccepted();
  };

  handleRejectedEvent = () => {
    const { setCallMissed } = this.props;

    Sound.stop();
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
    Sound.playRingbackTone();
    setIsCalling(true);
  };

  handleCancelEvent = () => {
    Sound.stop();
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
      // The user registered a phone number. He is able to make/receive calls
      case 'registered':
        this.handleRegisteredEvent();
        break;
      case 'registrationFailed':
        displayErrorAlert(
          'Error',
          'Unable to register the selected number. Please, logout and try again in a few minutes.'
        );
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
      // displayErrorAlert(`Unhandled event: ${event.name}`);
    }
  };

  render() {
    const { children } = this.props;
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(children);
  }
}

export default PhoneProvider;
