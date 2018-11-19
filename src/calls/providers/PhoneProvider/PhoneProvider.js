import React, { Children, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import * as connectionActionCreators from "calls/actions/connection";
import * as callActionCreators from "calls/actions/call";
import * as recentActionCreators from "calls/actions/recent";
import * as searchActionCreators from "calls/actions/search";
import { errorMessage, logEvent, logMessage } from "common/utils";
import { success, info, warning } from "common/actions/notifications";
import ErrorBoundary from "common/components/ErrorBoundary/ErrorBoundary";

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
class PhoneProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    requestConnection: PropTypes.func,
    setConnectionFailure: PropTypes.func,
    setConnected: PropTypes.func,
    requestDisconnection: PropTypes.func,
    setDisconnected: PropTypes.func,
    makeCall: PropTypes.func,
    rejectOutgoingCall: PropTypes.func,
    isCalling: PropTypes.func,
    isReceivingCall: PropTypes.func,
    callFailed: PropTypes.func,
    recipient: PropTypes.object,
    success: PropTypes.func,
    info: PropTypes.func,
    warning: PropTypes.func,
    unSelectUser: PropTypes.func.isRequired,
    addRecentCall: PropTypes.func.isRequired,
    acceptOutgoingCall: PropTypes.func.isRequired,
    hangupCall: PropTypes.func.isRequired,
    endSearch: PropTypes.func.isRequired,
    onCall: PropTypes.bool.isRequired,
    rejectIncomingCall: PropTypes.func.isRequired
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

  addListeners = () => {
    this.notifier = this.state.dial.getNotifier();
    if (this.notifier) {
      this.notifier.on("ToneEvent", event => {
        this.eventHandler(event);
      });
    }
  };

  playRingbacktone = () => {
    document.getElementById(this.ringBackToneId).play();
  };

  stopRingbacktone = () => {
    document.getElementById(this.ringBackToneId).pause();
  };

  playRingTone = () => {
    document.getElementById(this.ringToneId).play();
  };

  stopRingTone = () => {
    document.getElementById(this.ringToneId).pause();
  };

  sayHi = () => {
    logMessage("Hello!");
  };

  eventHandler = event => {
    logMessage("Event Received!");
    logMessage(event);
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

    let playPromise;
    switch (event.name) {
      // SetMedia
      case "trackAdded":
        playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(_ => {
              this.setState({
                trackAdded: true
              });
              // Automatic playback started!
              // Show playing UI.
            })
            .catch(error => {
              this.setState({
                trackAdded: false,
                error: error
              });
              // Auto-play was prevented
              // Show paused UI.
            });
        }
        break;
      // Registering
      case "registered":
        this.props.success(this.registeredNotificationOpts);
        this.props.setConnected();
        break;
      case "unregistered":
        this.props.warning(this.unRegisteredNotificationOpts);
        this.props.setDisconnected();
        break;
      case "registrationFailed":
        this.props.setConnectionFailure(event.detail.error);
        break;
      // Calls
      case "progress":
        logMessage("onACall");
        break;
      case "accepted":
        // TODO
        this.stopRingbacktone();
        this.props.acceptOutgoingCall();
        break;
      case "terminated":
        // TODO
        this.stopRingbacktone();
        this.props.success(this.callTerminatedNotificationOpts);
        this.hangUpCallEvent();
        break;
      case "rejected":
        // TODO: Detail doesn't include error field nor error code
        this.props.rejectOutgoingCall(tempRejectedMessage);
        this.stopRingbacktone();
        break;
      case "failed":
        // TODO
        this.props.callFailed(tempFailedMessage);
        break;

      case "invite":
        logMessage(event.data);
        this.receiveCall(event.data);
        break;
      default:
        errorMessage(`Unhandled event: ${event.name}`);
    }
  };

  receiveCall = ({ callerNumber, callerName }) => {
    const { isReceivingCall } = this.props;
    logMessage("Is receiving call");
    this.playRingTone();
    isReceivingCall(callerNumber, callerName);
  };

  /**
   * Authenticates the user using the Telephony API
   * @param username
   * @param password
   * @returns {boolean|void|*}
   */
  authenticateUser = (username, password) => {
    logEvent("calls", `authenticate`, `user: ${username}.`);
    logMessage(`Authenticating user: ${username}/*****`);
    this.setState({ username: username });
    this.props.requestConnection();
    return this.state.dial.authenticate(username, password);
  };

  /**
   * Unauthenticates the user
   */
  unAuthenticateUser = () => {
    logEvent("calls", `unAuthenticate`, `user: ${this.state.username}.`);
    this.setState({ username: undefined });

    if (this.props.onCall) {
      this.hangUpCurrentCall();
    }

    logMessage("UnAuthenticating user");
    this.props.requestDisconnection(true);
    return this.state.dial.stopAgent();
    // TODO Maybe stopAgent() is not the right method to call
  };

  /**
   * Makes a call to another person given his/her data
   * @param name Name of the person
   * @param phoneNumber Phone number
   * @returns {*}
   */
  makeCall = ({ name, phoneNumber }) => {
    const { makeCall, isCalling, endSearch } = this.props;
    const { dial, username } = this.state;

    logMessage(`Calling user ${name} with number ${phoneNumber}`);
    logEvent(
      "calls",
      `make`,
      `caller: ${username}. callee: ${name}. number: ${phoneNumber}`
    );
    makeCall({
      name: name,
      phoneNumber: phoneNumber,
      startTime: Date.now()
    });
    this.playRingbacktone();
    isCalling();
    endSearch();
    return dial.call(phoneNumber);
  };

  hangUpCurrentCall = () => {
    const { dial } = this.state;
    this.hangUpCallEvent();
    return dial.hangUp();
  };

  hangUpCallEvent = () => {
    const { username } = this.state;
    const { hangupCall, addRecentCall, unSelectUser, recipient } = this.props;

    logEvent("calls", `hangUp`, `caller: ${username}.`);

    hangupCall();
    addRecentCall(recipient);
    unSelectUser();
  };

  acceptOutgoingCall = () => {
    logMessage("Accepting call");
    this.props.acceptOutgoingCall();
    // TODO We need to stablish a connection between the clients
  };

  rejectOutgoingCall = () => {
    logMessage("Rejecting call");

    let {
      recipient,
      addRecentCall,
      unSelectUser,
      rejectOutgoingCall
    } = this.props;

    this.stopRingTone();
    addRecentCall(recipient);
    unSelectUser();
    rejectOutgoingCall();
  };

  acceptIncomingCall = () => {
    const { acceptIncomingCall } = this.props;

    logMessage("Accepting incoming call");
    this.stopRingTone();
    acceptIncomingCall();
  };

  /**
   * Method that must be called when an incoming call is rejected.
   * It performs all the actions needed by this action.
   */
  rejectIncomingCall = () => {
    logMessage("Rejecting incoming call");
    let { recipient } = this.props;
    const { addRecentCall, unSelectUser, rejectIncomingCall } = this.props;

    this.stopRingTone();
    addRecentCall(recipient);
    unSelectUser();
    rejectIncomingCall();
  };

  getChildContext() {
    return { phoneService: this.state.phoneService };
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

PhoneProvider.childContextTypes = {
  phoneService: PropTypes.object.isRequired
};

function mapStateToProps({ calls }) {
  return {
    recipient: calls.call ? calls.call.recipient : undefined,
    onCall: calls.call ? calls.call.onCall : false
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...connectionActionCreators,
      ...callActionCreators,
      ...recentActionCreators,
      ...searchActionCreators,
      success,
      info,
      warning
    },
    dispatch
  );
}

export default phoneService(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneProvider)
);
