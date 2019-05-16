import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import {
  errorMessage,
  infoMessage,
  logEvent,
  logMessage,
  toneInMessage,
  toneOutMessage
} from 'common/utils/logs';
/**
 * Interfaces between Telephony API and UI
 */
export default class PhoneProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    // Calls attrs
    onCall: PropTypes.bool.isRequired,
    recipient: PropTypes.object,
    token: PropTypes.string,
    doNotDisturb: PropTypes.bool.isRequired,
    // Calls funcs
    requestRegistration: PropTypes.func,
    setConnectionFailure: PropTypes.func,
    setRegistrationSuccess: PropTypes.func,
    requestDisconnection: PropTypes.func,
    setMakeCallRequest: PropTypes.func,
    rejectOutgoingCall: PropTypes.func,
    setIsCalling: PropTypes.func,
    setIsReceivingCall: PropTypes.func,
    setCallFailed: PropTypes.func,
    addRecentCall: PropTypes.func.isRequired,
    acceptOutgoingCall: PropTypes.func.isRequired,
    setCallFinished: PropTypes.func.isRequired,
    rejectIncomingCall: PropTypes.func.isRequired,
    // Notifications
    success: PropTypes.func,
    info: PropTypes.func,
    warning: PropTypes.func
  };

  static childContextTypes = {
    phoneService: PropTypes.object.isRequired
  };

  static async loadDialApi() {
    logMessage(process.env.REACT_APP_TONE_API_PATH);
    const { Dial } = await import(process.env.REACT_APP_TONE_API_PATH);
    return Dial;
  }

  state = {
    phoneService: this,
    phoneNumber: '',
    startTime: ''
  };

  ringToneId = 'ringTone';

  ringBackToneId = 'ringbackTone';

  callInputId = 'callsAudioInput';

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
    return { phoneService: this.state.phoneService };
  }

  componentDidMount() {
    let dial = null;
    PhoneProvider.loadDialApi().then(Dial => {
      this.audioElement = document.getElementById(this.callInputId);
      dial = new Dial(this.audioElement);
      this.setState(
        {
          dial
        },
        () => {
          this.addListeners();
        }
      );
    });
  }

  /**
   * Only for testing purposes.
   */
  sayHi = () => {
    logMessage('Hello!');
  };

  acceptIncomingCall = () => {
    const { dial } = this.state;
    toneOutMessage(`Accepting incoming call`);
    dial.answer();
  };

  acceptOutgoingCall = () => {
    logMessage('Accepting call');
    this.props.acceptOutgoingCall();
    // TODO We need to stablish a connection between the clients
  };

  addListeners = () => {
    this.notifier = this.state.dial.getNotifier();
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
    const { token, requestRegistration } = this.props;

    logEvent('calls', `authenticate`, `user: ${username}.`);
    toneOutMessage(`Authenticating user: ${username}/*****`);
    this.setState({ username });
    requestRegistration();
    this.state.dial.authenticate(username, token);
    // const eToken = this.state.dial.authenticate(username, token);
    // encryptToken(eToken);

    // TODO The ideal thing here is to know if the authentication succeeded
  };

  hangUpCurrentCallAction = () => {
    const { dial } = this.state;
    toneOutMessage(`Hang up current call`);
    return dial.hangUp();
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const { setCallFinished } = this.props;
    // logEvent("calls", `hangUp`, `caller: ${username}.`);
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
    const { dial, username } = this.state;

    // toneOutMessage(`Calling user ${name} with number ${phoneNumber}`);
    logEvent(
      'calls',
      `make`,
      `caller: ${username}. callee: ${name}. number: ${phoneNumber}`
    );
    setMakeCallRequest({
      name,
      phoneNumber
    });
    this.playRingbacktone();
    setIsCalling();
    return dial.call(phoneNumber);
  };

  playRingbacktone = () => {
    document
      .getElementById(this.ringBackToneId)
      .play()
      .catch(() => {
        errorMessage('RingbackTone play() raised an error.');
      });
  };

  playRingTone = () => {
    const { doNotDisturb } = this.props;
    if (!doNotDisturb) {
      document
        .getElementById(this.ringToneId)
        .play()
        .catch(() => {
          errorMessage('RingTone play() raised an error.');
        });
    }
  };

  sendDtmfCommand = tone => {
    this.state.dial.sendDTMF(tone);
  };

  stopRingbacktone = () => {
    document.getElementById(this.ringBackToneId).pause();
  };

  stopRingTone = () => {
    const { doNotDisturb } = this.props;
    if (!doNotDisturb) {
      document.getElementById(this.ringToneId).pause();
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
    const { dial } = this.state;
    dial.hangUp();
  };

  // rejectIncomingCall = () => {
  //   const { rejectIncomingCall } = this.props;
  //   const { dial } = this.state;

  //   logMessage('Rejecting incoming call');

  //   this.stopRingTone();
  //   rejectIncomingCall();
  //   return dial.hangUp();
  // };

  rejectOutgoingCall = () => {
    const { rejectOutgoingCall } = this.props;

    logMessage('Rejecting call');

    this.stopRingTone();
    rejectOutgoingCall();
  };

  /**
   * Logs the user out of TONE
   */
  unAuthenticateUser = () => {
    const { setCallFinished } = this.props;
    // logEvent("calls", `hangUp`, `caller: ${username}.`);
    logEvent('calls', `unAuthenticate`, `user: ${this.state.username}.`);
    toneOutMessage(`UnAuthenticating user`);

    this.setState({ username: undefined });

    if (this.props.onCall) {
      setCallFinished();
    }
    this.props.requestDisconnection(true);
    return this.state.dial.stopAgent();
  };

  addCallToRecentCalls = () => {
    logMessage(`addCallToRecentCalls`);
    const {
      addRecentCall,
      call: { recipient, caller, receivingCall, startTime, onCall }
    } = this.props;
    logMessage(caller);
    logMessage(receivingCall);
    addRecentCall(
      receivingCall ? caller : recipient,
      receivingCall,
      !onCall,
      startTime
    );
  };

  handleProgressEvent = () => {
    const { setIsCalling } = this.props;

    console.log('Call in progress...');
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
    // const caller = event.data.session.remoteIdentity.uri.user;
    // logMessage(caller);
    // this.receiveCall(event.data);
    // this.props.setRecipentPhoneNumber(caller);

    const { setIsReceivingCall } = this.props;
    this.playRingTone();
    // Retrieve the remote user information from the event data
    const { uri } = event.data.session.remoteIdentity;
    setIsReceivingCall(uri.user, null);
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
    // this.setState({
    //   startTime: Date.now()
    // });
    setCallAccepted();
  }

  handleTerminatedEvent() {
    const { setCallFinished, call: caller } = this.props;
    this.addCallToRecentCalls(caller.missed);
    setCallFinished();
  }

  handleUnregisteredEvent() {
    const { setDisconnectionSuccess } = this.props;
    setDisconnectionSuccess();
  }

  handleRegistationFailedEvent(event) {
    const { setConnectionFailure } = this.props;
    if (event.error !== undefined) {
      setConnectionFailure(event.error);
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
          // this.setState({
          //   trackAdded: true
          // });
        })
        .catch(error => {
          errorMessage('Unable to play the audio track.');
          // this.setState({
          //   trackAdded: false,
          //   error
          // });
        });
    }
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}
