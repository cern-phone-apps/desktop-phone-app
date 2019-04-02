import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import {
  errorMessage,
  infoMessage,
  logEvent,
  logMessage,
  toneInMessage,
  toneOutMessage
} from "common/utils/logs";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";

const tempRejectedMessage = {
  code: {
    status_code: "NI"
  },
  description: "NOT IMPLEMENTED (REJECTED)"
};

const tempFailedMessage = {
  code: {
    status_code: "NI"
  },
  description: "NOT IMPLEMENTED (FAILED)"
};

export const phoneService = ComponentToWrap => {
  return class ThemeComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      phoneService: PropTypes.object
    };

    render() {
      const { phoneService } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `phoneService` prop, like a hook
      return (
        <ErrorBoundary>
          <ComponentToWrap {...this.props} phoneService={phoneService} />
        </ErrorBoundary>
      );
    }
  };
};
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
    requestConnection: PropTypes.func,
    setConnectionFailure: PropTypes.func,
    setAuthenticated: PropTypes.func,
    requestDisconnection: PropTypes.func,
    setDisconnected: PropTypes.func,
    makeCall: PropTypes.func,
    rejectOutgoingCall: PropTypes.func,
    setIsCalling: PropTypes.func,
    setIsReceivingCall: PropTypes.func,
    setCallFailed: PropTypes.func,
    addRecentCall: PropTypes.func.isRequired,
    acceptOutgoingCall: PropTypes.func.isRequired,
    hangupCall: PropTypes.func.isRequired,
    rejectIncomingCall: PropTypes.func.isRequired,
    // Notifications
    success: PropTypes.func,
    info: PropTypes.func,
    warning: PropTypes.func
  };

  static childContextTypes = {
    phoneService: PropTypes.object.isRequired
  };

  state = {
    phoneService: this
  };

  ringToneId = "ringTone";
  ringBackToneId = "ringbackTone";
  callInputId = "callsAudioInput";

  registeredNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: "You are connected now",
    position: "tr",
    autoDismiss: 2
  };

  unRegisteredNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: "You have been disconnected",
    message: `You won't be able to make or receive any calls until you connect again`,
    position: "tr",
    autoDismiss: 4
  };

  callTerminatedNotificationOpts = {
    // uid: 'once-please', // you can specify your own uid if required
    title: "The call was terminated",
    position: "tr",
    autoDismiss: 2
  };

  static async loadDialApi() {
    logMessage(process.env.REACT_APP_TONE_API_PATH);
    const { Dial } = await import(process.env.REACT_APP_TONE_API_PATH);
    return Dial;
  }

  componentDidMount() {
    let dial = null;
    PhoneProvider.loadDialApi().then(Dial => {
      this.audioElement = document.getElementById(this.callInputId);
      dial = new Dial(this.audioElement);
      this.setState(
        {
          dial: dial
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
    logMessage("Hello!");
  };

  acceptIncomingCall = () => {
    const { acceptIncomingCall } = this.props;
    toneOutMessage(`Accepting incoming call`);

    this.stopRingTone();
    acceptIncomingCall();
    this.state.dial.answer();
  };

  acceptOutgoingCall = () => {
    logMessage("Accepting call");
    this.props.acceptOutgoingCall();
    // TODO We need to stablish a connection between the clients
  };

  addListeners = () => {
    this.notifier = this.state.dial.getNotifier();
    if (this.notifier) {
      this.notifier.on("ToneEvent", event => {
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
    const { token, requestConnection } = this.props;

    logEvent("calls", `authenticate`, `user: ${username}.`);
    toneOutMessage(`Authenticating user: ${username}/*****`);
    this.setState({ username: username });
    requestConnection();
    this.state.dial.authenticate(username, token);
    // const eToken = this.state.dial.authenticate(username, token);
    // encryptToken(eToken);

    // TODO The ideal thing here is to know if the authentication succeeded
  };

  handleTrackAddedEvent(event) {
    this.audioElement.srcObject = event.data.remoteStream;
    let playPromise = this.audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          infoMessage("On a call. Audio track playing");
          this.setState({
            trackAdded: true
          });
        })
        .catch(error => {
          errorMessage("Unable to play the audio track.");
          this.setState({
            trackAdded: false,
            error: error
          });
        });
    }
  }

  hangUpCurrentCallAction = () => {
    const { dial } = this.state;
    toneOutMessage(`Hang up current call`);
    return dial.hangUp();
  };

  hangUpCallEvent = () => {
    // const { username } = this.state;
    const { hangupCall } = this.props;
    // logEvent("calls", `hangUp`, `caller: ${username}.`);
    hangupCall();
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = ({ name, phoneNumber }) => {
    const { makeCall, setIsCalling } = this.props;
    const { dial, username } = this.state;

    // toneOutMessage(`Calling user ${name} with number ${phoneNumber}`);
    logEvent(
      "calls",
      `make`,
      `caller: ${username}. callee: ${name}. number: ${phoneNumber}`
    );
    makeCall({
      name: name,
      phoneNumber: phoneNumber
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
        errorMessage("RingbackTone play() raised an error.");
      });
  };

  playRingTone = () => {
    const { doNotDisturb } = this.props;
    if (!doNotDisturb) {
      document
        .getElementById(this.ringToneId)
        .play()
        .catch(() => {
          errorMessage("RingTone play() raised an error.");
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
    logMessage("Is receiving call");
    this.playRingTone();
    setIsReceivingCall(callerNumber, callerName);
  };

  /**
   * Method that must be called when an incoming call is rejected.
   * It performs all the actions needed by this action.
   */
  rejectIncomingCall = () => {
    const { rejectIncomingCall } = this.props;
    const { dial } = this.state;

    logMessage("Rejecting incoming call");

    this.stopRingTone();
    rejectIncomingCall();
    return dial.hangUp();
  };

  rejectOutgoingCall = () => {
    const { rejectOutgoingCall } = this.props;

    logMessage("Rejecting call");

    this.stopRingTone();
    rejectOutgoingCall();
  };

  /**
   * Logs the user out of TONE
   */
  unAuthenticateUser = () => {
    const { hangupCall } = this.props;
    // logEvent("calls", `hangUp`, `caller: ${username}.`);
    logEvent("calls", `unAuthenticate`, `user: ${this.state.username}.`);
    toneOutMessage(`UnAuthenticating user`);

    this.setState({ username: undefined });

    if (this.props.onCall) {
      hangupCall();
    }
    this.props.requestDisconnection(true);
    return this.state.dial.stopAgent();
  };

  getChildContext() {
    return { phoneService: this.state.phoneService };
  }

  eventHandler = event => {
    toneInMessage(`Tone Event received: ${event.name}`);
    toneInMessage(event);

    switch (event.name) {
      case "accepted":
        this.handleAcceptedEvent(event);
        break;
      case "failed":
        this.handleCallFailedEvent(event);
        break;
      case "inviteReceived":
        this.handleInviteReceivedEvent(event);
        break;
      case "progress":
        break;
      case "terminated":
        this.handleTerminatedEvent(event);
        break;
      case "trackAdded":
        this.handleTrackAddedEvent(event);
        break;
      case "registered":
        this.handleRegisteredEvent(event);
        break;
      case "registrationFailed":
        this.handleRegistationFailedEvent(event);
        break;
      case "rejected":
        // TODO: Detail doesn't include error field nor error code
        this.handleRejectedEvent(event);
        break;
      case "unregistered":
        this.handleUnregisteredEvent(event);
        break;
      default:
        errorMessage(`Unhandled event: ${event.name}`);
    }
  };

  /**
   * =======
   * EVENTS
   * =======
   */
  handleRegisteredEvent() {
    const { setAuthenticated } = this.props;
    setAuthenticated();
    // if (firstRegister) {
    //   success(this.registeredNotificationOpts);
    // }
  }

  handleInviteReceivedEvent(event) {
    const caller = event.data.session.remoteIdentity.uri.user;
    logMessage(caller);
    this.receiveCall(event.data);
    this.props.setRecipentPhoneNumber(caller);
  }

  handleRejectedEvent(event) {
    // this.stopRingbacktone();
    // this.hangUpCallEvent();
  }

  handleAcceptedEvent(event) {
    this.stopRingbacktone();
    const { setRecipentStartDate, acceptOutgoingCall } = this.props;
    setRecipentStartDate(Date.now());
    acceptOutgoingCall();
  }

  handleTerminatedEvent(event) {
    const { success, onCall, addRecentCall, recipient, hangupCall } = this.props;
    let recipient2 = recipient;
    if (!recipient2.name) {
      recipient2.name = recipient2.phoneNumber;
    }
    if (onCall) {
      recipient2.endDate = new Date();
    } else {
      recipient2.missed = true;
      recipient2.endDate = recipient2.startDate;
    }
    logMessage(recipient2);
    addRecentCall(recipient2);

    hangupCall();
    success(this.callTerminatedNotificationOpts);
    this.stopRingbacktone();
    this.stopRingTone();
  }

  handleUnregisteredEvent(event) {
    const { setDisconnected, warning } = this.props;
    warning(this.unRegisteredNotificationOpts);
    setDisconnected();
  }

  handleRegistationFailedEvent(event) {
    const { setConnectionFailure } = this.props;
    if (event.error !== undefined) {
      setConnectionFailure(event.error);
    }
  }

  handleCallFailedEvent(event) {
    const { setCallFailed } = this.props;
    setCallFailed();
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}
