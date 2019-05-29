/**
 * dial-api.js for DIAL-TONE.
 * @version 0.8.0
 *
 * WebRTC API for audio calls through PC for TONE infrastructure.
 * DIAL-TONE (Distributed Infrastructure Architecture Leading to TONE)
 * where a WebRTC API will be integrated so IT-CDA can provide a
 * universal client for all browsers and operating systems.
 *
 * @author João Filipe Garrett Paixão Florêncio <joao.florencio@cern.ch>
 */

import SHA512 from "crypto-js/sha512";

var SIP = require('sip.js');
// const SessionDescriptionHandler = require('./React/SessionDescriptionHandler')(SIP).defaultFactory;
// const SessionDescriptionHandler = require('../../node_modules/sip.js/src/React/SessionDescriptionHandler')(SIP).defaultFactory;


// Constants

/**
 * @const {EventEmitter} EventEmitter front-end URI
 */
const EventEmitter = require('events');

/**
 * Notifier class, extends EventEmitter. Responsible for sending events.
 * The clients of this API will listen for events on an instance of this class.
 * @class
 * @typedef DialNotifier
 */
export class DialNotifier extends EventEmitter {}

 /**
 * Main API Class
 * @class
 * @property {!Object} dialNotifier instance of DialNotifier where clients listen for events.
 * @property {!Object} ua UserAgent object attached to a WebRTC connection.
 * @property {!Object} session WebRTC session object attached to a UserAgent.
 * @property {!Object} config WebRTC configuration for starting the UserAgent.
 * @property {!Object} handler WebRTC MediaHandler object.
 * @property {boolean} onCall Indicates if the current session is in a call.
 * @property {boolean} inviteReceived Indicates if the there is an active incoming call still unanswered.
 */
export class Dial {

  constructor() {
    console.debug("Dial initialized");
    this.dialNotifier = new DialNotifier();
    this.discoverServer();

    this.messages = {
      10 : "No network connection.",
      11 : "Cannot connect to TONE infrastructure.",
      20 : "Error with media. No audio.",
      30 : "Incorrect invite received.",
      40 : "Disconnected from TONE server.",
      50 : "Cannot make call. Your are not registered.",
      51 : "Cannot make call. You dont have the rights.",
      52 : "Make call remotely rejected. Called user unkown.",
      53 : "Make call remotely rejected. Called user is busy.",
      54 : "Make call remotely rejected. Called user is not registered.",
      60 : "Register rejected. Unathorized user.",
      61 : "Register rejected. Unkown user.",
    };
  }

  /**
   * Main entrypoint for API usage. This function starts the UserAgent
   * with the user given and the CERN OAuth access token to be verified in TONE.
   * @param {!string} user The phone number the client wants to register.
   * @param {!string} accessToken A string with a cern OAuth2.0 token.
   * @returns {string} Hex encoded string of the SHA512 hash of the token.
   */
  authenticate(user, accessToken) {
    if (user && accessToken) {
      try {
        this.startAgent(user,accessToken);
        this.tokenHash = SHA512(accessToken).toString();
        console.log("hashed token:" + this.tokenHash);
        return this.tokenHash;
      }
      catch (e) {
        console.error("Error authenticate:" + e + "\n");
      }
    }
    else throw Error("Cannot authenticate. Token or User not set.");
  }

  /**
   * Sets up a listener to SIP.js session's trackAdded event.
   * Relays the event with the track to the client.
   * Playing the track is client's responsability.
   */
  addTrackListener(){
    this.session.on('trackAdded', function() {
      // We need to check the peer connection to determine which track was added
      var sdh = this.session.sessionDescriptionHandler;
      if(sdh == undefined){
        throw Error('Session description handler not defined.');
      } else {
        var pc = this.session.sessionDescriptionHandler.peerConnection;
        // Gets remote tracks
        var remoteStream = new MediaStream();
        pc.getReceivers().forEach(function(receiver) {
          remoteStream.addTrack(receiver.track);
        });
        this.onCall = true;
        var event = Dial.buildEvent('trackAdded', {'remoteStream':remoteStream});
        this.sendEvent(event);
      }
    }.bind(this));
  }

  /**
   * Basic call function. If the user agent is started, sets the session.
   * @param {!string} callee Contact name.
   */
  call(callee) {
    if(!this.ua){
      throw Error("Cannot launch call. User agent not set.");
    }
    var options = {
      'extraHeaders': [ 'X-Tone-hash:' + this.tokenHash ]
    };
    let fullURI = callee + '@' + this.uri;
    let session = this.ua.invite(fullURI,options);
    this.setSession(session);
    // this.agentLastTrigger = 'inviteSent';
  }

  /**
   * Answers an incoming call.
   * Assumes there is a previously received invite, if not returns an error.
   */
  answer() {
    if(!this.inviteReceived){
      throw Error("Cannot answer call. No invite received.");
    }
    if(!this.session){
      throw Error("Cannot answer call. Session not established.");
    }
    this.session.accept();
    this.onCall = true;
    var event = Dial.buildEvent('inviteAccepted', {'session':this.session});
    this.sendEvent(event);
  }

  /**
   * Call finishing. Flush the current session.
   */
  hangUp() {
    if (this.onCall) {
      this.onCall = false;
      this.inviteReceived = false;
      this.session.terminate();
      this.session = null;
    }
    else if(this.inviteReceived){
      this.session.reject();
    }
    else throw Error("Hang up when not on a call and no invite.");
  }

  /**
   * Function to send DTMF tones.
   * @param {!string} tone The DTMF digits to send. It may be a string or an integer.
   */
  sendDTMF(tone){
    if (this.onCall) {
      this.session.dtmf(tone);
    }
    else throw Error("Trying to send DTMF digits when not on a call.");
  }

  /**
   * Internal function, to be call upon user agent creation.
   * Returns an FQDN of the TONE server to connect to.
   */
  discoverServer() {
    /*
      go discover a service! go!
    */
    this.uri = 'tone-0513-wpilot-fe-2.cern.ch';
  }

  /**
   * Checks if current agent is on a call.
   * Alerting and calling states are considered on-call states.
   * @returns {boolean} On call value.
   */
  isOnCall(){
    return this.onCall;
  }

  /**
   * Checks if current agent received an invite recently and is able to answer a call.
   * @returns {boolean} True if agent is able to answer a call.
   */
  isRinging(){
    return this.inviteReceived;
  }

  /**
   * UserAgent initialization given SIP credentials and the WebRTC config. In addition,
   * the function initializes the UserAgent event triggers.
   * @param {!string} user Contact SIP username.
   * @param {!string} accessToken User token got from CERN OAuth seervers.
   */
  startAgent(user,accessToken) {
    this.config = {
      uri: user + '@' + this.uri,
      allowLegacyNotifications: true,
      transportOptions: {
        wsServers: [
          {
            ws_uri: 'wss://' + this.uri + ':8089/ws',
            weight: 10,
          },
        ],
        traceSip: true,
      },
      sessionDescriptionHandlerFactoryOptions: {
        constraints: {
          audio: true,
          video: false
        }
      },
      // sessionDescriptionHandlerFactory: function (session, options) {
      //   return new SessionDescriptionHandler(session, options);
      // },
      contactName: user,
      authorizationUser: user,
      password: '',
      hackWssInTransport: true,
      register: false,
      autostart: true,
      log: {
        level: 'debug'
      },
      hackIpInContact: false,
      userAgentString: 'sip.js-v0.11.2 IT-CS-TR'
    };

    // @ts-ignore
    this.ua = new SIP.UA(this.config);
    // this.ua = new SIP_main.UA(this.config);
    this.addListeners(accessToken);
  }

  /**
   * Adds listener handler behaviour for user-agent events.
   * These are not session events (related to a particular call/session)
   * @param {!string} accessToken A string with a cern OAuth2.0 token to be used in Register requests.
   */
  addListeners(accessToken){
    this.ua.on('registered', function () {
      var event = Dial.buildEvent('registered', {});
      this.sendEvent(event);
    }.bind(this));
    this.ua.on('unregistered', function (response, cause) {
      var event = Dial.buildEvent('unregistered',{},cause,response);
      this.sendEvent(event);
    }.bind(this));
    this.ua.on('registrationFailed', function (cause, response) {
      var event = Dial.buildEvent('registrationFailed',{},cause,response);
      this.sendEvent(event);
    }.bind(this));
    this.ua.on('invite', function (session) {
      this.inviteReceived = true;
      this.setSession(session);
      var event = Dial.buildEvent('inviteReceived', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    this.ua.on('message', function (message) {
      var event = Dial.buildEvent('Message received', {'message':message});
      this.sendEvent(event);
    }.bind(this));
    this.ua.transport.on('connected', function () {
      this.startRegister(accessToken);
    }.bind(this));
  }

  /**
   * Starts sending the SIP register requests to TONE.
   * Periodic keep-alive register start to be sent until unregistration.
   * @param {!string} accessToken The access token sent as an custom header ('X-Tone-token').
   */
  startRegister(accessToken){
    var options = {
      'extraHeaders': [ 'X-Tone-token:' + accessToken ]
    };
    this.ua.register(options);
  }

  /**
   * Helper function to create event objects to send out to client
   * @param {!string} name The name of the event.
   * @param {!object} data Aditional event data.
   * @param {number} [errorCode = 0] Eventual numeric error code.
   * @param {string}  [errorMsg = undefined] Eventual error message.
   * @returns {event} True if agent is able to answer a call.
   */
  static buildEvent(name, data, errorCode=0, errorMsg=undefined){
   var event = {
      'name': name,
      'data' : data
    };
    if(errorCode){
      var errorObj = {
        'code': errorCode,
        'description': errorMsg
      };
      event.error = errorObj;
    }
    return event;
  }

  /**
   * This functions emits the events sent client.
   * @param {!object} event The event object.
   */
  sendEvent(event){
    this.dialNotifier.emit('ToneEvent',event);
  }

  /**
   * This functions returns an object in which the client can listen to TONE events.
   */
  getNotifier(){
    return this.dialNotifier;
  }

  /**
   * This functions stops the user-agent finishing interaction with TONE.
   */
  stopAgent() {
    this.ua.stop();
  }

  /**
   * Cleans-up call related flags.
   */
  endCleanup(){
    this.onCall = false;
    this.inviteReceived = false;
  }

  /**
   * Initializes the Session and sets the session event triggers.
   * @param {!Object} session Current session.
   */
  setSession(session) {
    session.on('progress', function () {
      var event = Dial.buildEvent('progress', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('accepted', function () {
      var event = Dial.buildEvent('accepted', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('rejected', function () {
      this.endCleanup();
      var event = Dial.buildEvent('rejected', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('failed', function () {
      this.endCleanup();
      var event = Dial.buildEvent('failed', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('cancel', function () {
      this.endCleanup();
      var event = Dial.buildEvent('cancel', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('bye', function () {
      this.endCleanup();
      if (session === this.session)
        delete this.session;
      var event = Dial.buildEvent('bye', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('terminated', function () {
      this.endCleanup();
      if (session === this.session)
        delete this.session;
      var event = Dial.buildEvent('terminated', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('reinvite', function () {
      var event = Dial.buildEvent('reinvite', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('replaced', function () {
      var event = Dial.buildEvent('replaced', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('dtmf', function(request, dtmf) {
      var event = Dial.buildEvent('dtmf', {'number': dtmf});
      this.sendEvent(event);
    }.bind(this));
    session.on('SessionDescriptionHandler-created', function () {
      var event = Dial.buildEvent('SessionDescriptionHandler-created', {});
      this.sendEvent(event);
      // setting up event for failure of user media here
      // since session description handler only exists from this moment on.
      session.sessionDescriptionHandler.on('userMediaFailed', function() {
        this.endCleanup();
        var event = Dial.buildEvent('userMediaFailed', {});
        this.sendEvent(event);
      }.bind(this));
    }.bind(this));
    session.on('directionChanged', function () {
      var event = Dial.buildEvent('directionChanged', {});
      this.sendEvent(event);
    }.bind(this));
    session.on('referRequested', function(context) {
      this.setSession(context.newSession);
      var event = Dial.buildEvent('referRequested', {});
      this.sendEvent(event);
    }.bind(this));

    this.session = session;
    this.addTrackListener();
  }

  /**
   * Terminates the current Session gracefully.
   */
  terminateSession() {
    if (this.session) {
      this.session.terminate();
    }
  }

  /**
   * Sends errors as DialToneError events to client.
   * @param {!string} code Current numeric error code.
   * @param {number} sipCode Numeric SIP message code.
   */
  sendError(code,sipCode = -1){
    var message = this.messages[code];
    var event = Dial.buildEvent('DialToneError', {'sipErrorCode': sipCode}, code, message);
    this.sendEvent(event);
  }

}
