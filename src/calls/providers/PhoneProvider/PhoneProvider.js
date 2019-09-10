import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { Dial } from 'tone-api-web';

import {
  errorMessage,
  infoMessage,
  logMessage,
  toneInMessage,
  toneOutMessage,
  warnMessage
} from 'common/utils/logs';

import ElectronService from 'services/electron-service';

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
    setTempCallFinished: PropTypes.func.isRequired,
    setOngoingCallFinished: PropTypes.func.isRequired,
    setCallMissed: PropTypes.func.isRequired,
    setCallAccepted: PropTypes.func.isRequired,
    setDisconnectionSuccess: PropTypes.func.isRequired,
    setRegistrationFailure: PropTypes.func.isRequired,
    incrementAdditionalCallsNumber: PropTypes.func.isRequired,
    decrementAdditionalCallsNumber: PropTypes.func.isRequired,
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
    this.initializeToneApi();
  }

  initializeToneApi = () => {
    const devMode = false;

    this.audioElement = document.getElementById(callInputId);
    this.setState(
      {
        toneAPI: new Dial(devMode)
      },
      () => {
        this.addListeners();
      }
    );
  };

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
  authenticateUser = async username => {
    const {
      requestRegistration,
      authToken,
      clearAuthToken,
      setRegistrationFailure
    } = this.props;

    const { toneAPI } = this.state;
    const toneToken = ElectronService.getToneToken();
    let tokenUsed = 'authToken';
    // logEvent('calls', `authenticate`, `user: ${username}.`);
    toneOutMessage(`Authenticating user: ${username}/*****`);
    toneOutMessage(`Authenticating user: ${toneToken}`);
    requestRegistration();
    /**
     * If there is an authToken, we use that token. Else, we use the already encrypted token provided by the api
     */
    let tempToken;
    if (authToken) {
      tempToken = authToken;
    } else {
      tempToken = toneToken;
      tokenUsed = 'hashedToken';
    }
    try {
      logMessage(`Authenticating user ${username} and ${tokenUsed}`);
      const eToken = toneAPI.authenticate(username, tempToken, !!authToken);
      if (authToken) {
        /**
         * If the authToken was used, we clear the original auth token as we will use the encrypted token from now on.
         */
        logMessage(`Clear auth token...`);
        clearAuthToken();
        logMessage(`Save new token...`);
        ElectronService.saveToneToken(eToken);
      }
    } catch (error) {
      errorMessage(`Unable to authenticate the user`);
      errorMessage(error);

      const errorToDisplay = {
        code: {
          status_code: 'UA-1'
        },
        description: `Unable to authenticate the user on TONE`
      };
      setRegistrationFailure(errorToDisplay);
      // logout();
    }
  };

  hangUpCurrentCallAction = (hangupDefault = false) => {
    const { toneAPI } = this.state;
    toneOutMessage(`Hang up current call`);
    if (hangupDefault) {
      this.hangupDefault = true;
      logMessage('hangupDefault is true');
    }
    try {
      toneAPI.hangUp();
    } catch (error) {
      console.error(error);
    }
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const { setTempCallFinished, onCall, setOngoingCallFinished } = this.props;
    // logEvent("calls", `hangUp`, `remote: ${username}.`);
    if (onCall) {
      setOngoingCallFinished();
    } else {
      setTempCallFinished();
    }
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = ({ name, phoneNumber }) => {
    const { setMakeCallRequest, setIsCalling, setCallId } = this.props;
    const { toneAPI } = this.state;

    setMakeCallRequest({
      name,
      phoneNumber
    });
    this.playRingbacktone();
    setIsCalling();
    const callSessionId = toneAPI.call(phoneNumber);

    setCallId(callSessionId);
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
    toneAPI.hangUpCallId(toneAPI.getMostRecentSession().id);
  };

  /**
   * Logs the user out of TONE
   */
  unAuthenticateUser = () => {
    const {
      requestDisconnection,
      call: onCall,
      setOngoingCallFinished
    } = this.props;
    const { toneAPI } = this.state;
    toneOutMessage(`UnAuthenticating user`);

    if (onCall) {
      setOngoingCallFinished();
    }
    requestDisconnection(true);
    try {
      toneAPI.stopAgent();
    } catch (error) {
      errorMessage(error);
    }
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

  showNotification = () =>
    new Notification('You are receiving a call.', {
      requireInteraction: true,
      timeout: 60
    });

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
      registrationFailed: this.handleRegistrationFailedEvent,
      unregistered: this.handleUnregisteredEvent,
      terminated: this.handleTerminatedEvent,
      accepted: this.handleAcceptedEvent,
      rejected: this.handleRejectedEvent,
      inviteReceived: this.handleInviteReceivedEvent,
      failed: this.handleFailedEvent,
      progress: this.handleProgressEvent,
      cancel: this.handleCancelEvent,
      trackAdded: this.handleTrackAddedEvent
    }[event.name];

    if (handler) {
      handler(event);
    } else {
      warnMessage(`Unhandled event: ${event.name}`);
    }
  };

  handleRegisteredEvent = () => {
    const { setRegistrationSuccess } = this.props;
    setRegistrationSuccess();
  };

  handleAdditionalCall = () => {};

  handleInviteReceivedWithAdditionalCalls = () => {
    const {
      call: { onCall },
      incrementAdditionalCallsNumber
    } = this.props;
    if (onCall) {
      incrementAdditionalCallsNumber();
    }
  };

  handleInviteReceivedEvent = event => {
    const {
      setIsReceivingCall,
      call: { onCall },
      doNotDisturb,
      setCallId
    } = this.props;
    const { toneAPI } = this.state;
    logMessage(`handleInviteReceivedEvent with onCall: ${onCall}`);
    logMessage(onCall);
    logMessage(event);
    logMessage(toneAPI.getMostRecentSession().id);
    logMessage(toneAPI.getDefaultSession().id);
    if (onCall) {
      this.handleInviteReceivedWithAdditionalCalls();
    } else {
      this.playRingTone();
    }
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    setIsReceivingCall(uri.user, null);
    setCallId(toneAPI.getMostRecentSession().id);
    if (doNotDisturb) {
      this.showNotification();
    }
    ElectronService.setReceivingCall(doNotDisturb);
  };

  handleRejectedEvent = () => {
    const { setCallMissed } = this.props;
    this.stopRingbacktone();
    this.stopRingTone();
    setCallMissed();
  };

  handleAcceptedEvent = () => {
    const { setCallAccepted } = this.props;
    this.stopRingbacktone();
    this.stopRingTone();
    setCallAccepted();
  };

  /**
   * If we receive a terminated event, it can happen for the ongoing call or for the additional call.
   * If there are additional calls (more than 1 at the time) and there is a 'terminate' event.
   * - One of the calls has been removed.
   * - We need to determine which call was it: the ongoing call (the user hangup and answer the new call)
   *  or the new incoming call (the user rejected the call)
   */
  handleTerminatedEventWithAdditionalCalls = () => {
    const {
      setTempCallFinished,
      addRecentCall,
      setOngoingCallFinished,
      call: { additionalCalls, remote, tempRemote },
      decrementAdditionalCallsNumber
    } = this.props;

    if (additionalCalls > 0) {
      decrementAdditionalCallsNumber();

      if (this.hangupDefault) {
        logMessage('Hanging up default call...');
        // We want to hangup the ongoing call
        addRecentCall(remote);
        // We keep the additional call
        setOngoingCallFinished();
        // This must be after addCallToRecentCalls
        this.hangupDefault = false;
      } else {
        logMessage('Hanging up temp call');
        // We want to hangup the additionalCall
        logMessage(tempRemote);
        addRecentCall(tempRemote);
        // We keep the remote
        setTempCallFinished();
      }
    }
  };

  handleTerminatedEvent = () => {
    const {
      addRecentCall,
      setTempCallFinished,
      setOngoingCallFinished,
      call: { additionalCalls, tempRemote, remote, onCall }
    } = this.props;

    if (additionalCalls > 0) {
      // We need to handle the additionalCalls
      this.handleTerminatedEventWithAdditionalCalls();
    } else if (onCall) {
      // We handle the ongoing call
      addRecentCall(remote);
      setOngoingCallFinished();
    } else {
      // We handle the temp call
      addRecentCall(tempRemote);
      setTempCallFinished();
    }
  };

  handleUnregisteredEvent = () => {
    const { setDisconnectionSuccess } = this.props;
    setDisconnectionSuccess();
  };

  handleRegistrationFailedEvent = event => {
    const { setRegistrationFailure } = this.props;
    if (event.error.description !== undefined) {
      setRegistrationFailure(event.error);
    }
  };

  handleCallFailedEvent = () => {
    const { setCallFailed } = this.props;
    const tempFailedMessage = {
      code: {
        status_code: 'NI'
      },
      description: 'Call failed'
    };
    setCallFailed(tempFailedMessage);
  };

  handleTrackAddedEvent = event => {
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
  };

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}
