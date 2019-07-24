/**
 * dial-api.js for DIAL-TONE.
 * @version 0.8.7
 *
 * WebRTC API for audio calls through PC for TONE infrastructure.
 * DIAL-TONE (Distributed Infrastructure Architecture Leading to TONE)
 * where a WebRTC API will be integrated so IT-CDA can provide a
 * universal client for all browsers and operating systems.
 *
 * @author JoÃ£o Filipe Garrett PaixÃ£o FlorÃªncio <joao.florencio@cern.ch>
 */

import SHA512 from "crypto-js/sha512";

var SIP = require('sip.js');

var initialServerList = [
  {
    address : 'tone-0513-wpilot-fe-2.cern.ch',
    priority: 10,
  },
  {
    address : 'tone-0513-wfe-qa.cern.ch',
    priority: 9,
  }
];

var dynamicServerListURL = 'https://gw-config.web.cern.ch/gw-config/wfe-serverlist/serverList.php';
var dynamicServerListURLDev = dynamicServerListURL + '?development=true';

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
 * @property {!Object} sessionList Object with a list of WebRTC sessions objects attached to a UserAgent, mapped by id.
 * @property {!Object} config WebRTC configuration for starting the UserAgent.
 * @property {!Object} handler WebRTC MediaHandler object.
 * @property {boolean} onCall Indicates if the current session is in a call.
 * @property {boolean} inviteReceived Indicates if the there is an active incoming call still unanswered.
 * @property {string}  tokenHash SHA-512 hash string of the full token passed to the authenticate method.
 * @property {boolean} devMode Boolean indicating if API is being used in develoment mode, which changes the servers it connects to.
 * @property {boolean} returningUser Boolean indicating if Dial is instantiated again in a short period to know if it should use the same hashed token.
 */
export class Dial {

  constructor(dev = false, returning = false) {
    console.debug("Dial initialized");
    this.dialNotifier = new DialNotifier();

    this.devMode = dev;
    this.returningUser = returning;
    this.discoverServer();

    this.sessionList = {};

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
        this.user = user;
        this.token = accessToken;
        this.tokenHash = SHA512(accessToken).toString();
        // console.log("hashed token:" + this.tokenHash);
        this.startAgent();
        return this.tokenHash;
      }
      catch (e) {
         throw Error("Error authenticate:" + e + "\n");
      }
    }
    else throw Error("Cannot authenticate. Token or User not set.");
  }

  /**
   * Sets up a listener to SIP.js session's trackAdded event.
   * Relays the event with the track to the client.
   * Playing the track is client's responsability.
   */
  addTrackListener(session){
    session.on('trackAdded', function() {
      // We need to check the peer connection to determine which track was added
      var sdh = session.sessionDescriptionHandler;
      if(sdh == undefined){
        throw Error('Session description handler not defined.');
      } else {
        var pc = session.sessionDescriptionHandler.peerConnection;
        // Gets remote tracks
        var remoteStream = new MediaStream();
        pc.getReceivers().forEach(function(receiver) {
          remoteStream.addTrack(receiver.track);
        });
        this.onCall = true;
        var event = Dial.buildEvent('trackAdded', {'remoteStream':remoteStream, 'session': session});
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
    this.initializeSession(session);
    return session.id;
    // this.agentLastTrigger = 'inviteSent';
  }

  /**
   * Answers a specific incoming call.
   * Assumes there is a previously received invite, if not returns an error.
   * @param {!object} session Session object.
   */
  answerCall(session) {
    if(!this.inviteReceived){
      throw Error("Cannot answer call. No invite received.");
    }
    if(!session){
      throw Error("Cannot answer call. Session not established.");
    }
    session.accept();
    this.onCall = true;
    var event = Dial.buildEvent('inviteAccepted', {'session':session});
    this.sendEvent(event);
  }

  /**
   * Answers an incoming call.
   * Assumes there is a previously received invite, if not returns an error.
   * @param {!string} sessionId Session ID string.
   */
  answerCallId(sessionId) {
    return this.answerCall(this.sessionList[sessionId]);
  }

  /**
   * Answers an incoming call.
   * Assumes there is a previously received invite, if not returns an error.
   */
  answer() {
    return this.answerCall(this.getMostRecentSession());
  }

  /**
   * Call finishing by providing session object.
   * @param {!object} session Session object.
   */
  hangUpCall(session) {
    if (session && session != undefined){
      if(this.sessionOnCall(session) || this.onCall){
        session.terminate();
        delete this.sessionList[session.id];
      }
      else if(this.inviteReceived) {
        session.reject();
      }
      else throw Error("Trying to hang up a non valid session.");
    }
    else throw Error("Trying to hang up a non valid session.");
  }

  /**
   * Call finishing by providing session Id.
   * @param {!string} sessionId Session ID string.
   */
  hangUpCallId(sessionId) {
    return this.hangUpCall(this.sessionList[sessionId]);
  }

  /**
   * Call finishing. Flush the current session.
   */
  hangUp(){
    return this.hangUpCall(this.getDefaultSession());
  }



  /**
   * Function to send DTMF tones.
   * @param {!string} tone The DTMF digits to send. It may be a string or an integer.
   */
  sendDTMF(tone){
    if (this.onCall) {
      this.getDefaultSession.dtmf(tone);
    }
    else throw Error("Trying to send DTMF digits when not on a call.");
  }

  /**
   * Internal function, to be call upon user agent creation.
   * Returns an FQDN of the TONE server to connect to.
   */
  discoverServer() {
    this.uri = 'tone-wfe.cern.ch';
    this.saveServerList(initialServerList);
    this.saveServerListFromServer();
  }

  /**
   * Internal function, to be called to handle server lists and save them in the SIP.JS's UserAgent.
   */
  saveServerList(list){
    var wsList = [];
    list.forEach(function(server) {
      var wsServerObj = {
          wsUri : 'wss://'+ server.address +':8089/ws',
          weight: server.priority
      }
      wsList.push(wsServerObj);
    });
    this.serverList = wsList;
  }

   /**
   * Tries to read a list of servers from the URL specified in dynamicServerListURL.
   */
  saveServerListFromServer(){
    // read JSON from URL location
    var url = (this.devMode)? dynamicServerListURLDev : dynamicServerListURL;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'json';
    var classInstance = this;
    request.onload = function(event, caller = classInstance) {
      var status = request.status;
      console.log(request.response);
      if (status === 200) {
        //tokenHash == undefined means that no authentication process has started while we waited for the server list
        if(caller.ua == undefined){
          try {
            caller.saveServerList(request.response);
            console.log("Saving list since UA hasnt been created yet.");
          } catch (e) {
            throw Error("Error reading JSON from server. Local server list will be used.");
          }
        }
      } else {
        throw Error("Error loading server list from URL.");
      }
    };
    request.send();
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
   * Checks if the given session is on a call.
   * @param {object} session The session object.
   */
  sessionOnCall(session){
    return session.startTime != null;
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
   */
  startAgent() {
    this.config = {
      uri: this.user + '@' + this.uri,
      allowLegacyNotifications: true,
      transportOptions: {
        wsServers: this.serverList,
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
      contactName: this.user,
      authorizationUser: this.user,
      password: '',
      hackWssInTransport: true,
      register: false,
      autostart: true,
      log: {
        level: 'debug'
      },
      hackIpInContact: false,
      userAgentString: 'sip.js-v0.13.8 IT-CS-TR'
    };

    // @ts-ignore
    this.ua = new SIP.UA(this.config);
    // this.ua = new SIP_main.UA(this.config);
    this.addListeners();
  }

  /**
   * Adds listener handler behaviour for user-agent events.
   * These are not session events (related to a particular call/session)
   */
  addListeners(){
    this.ua.on('registered', function () {
      this.token = undefined;
      var event = Dial.buildEvent('registered', {});
      this.sendEvent(event);
      if(!this.firstRegister){
        this.startRegister(this.tokenHash);
      }
      this.firstRegister = true;
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
      this.initializeSession(session);
      var event = Dial.buildEvent('inviteReceived', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    this.ua.on('message', function (message) {
      var event = Dial.buildEvent('Message received', {'message':message});
      this.sendEvent(event);
    }.bind(this));
    this.ua.transport.on('connected', function () {
      var tokenVersion = this.token;
      if(this.returningUser) {
        this.firstRegister = true;
        tokenVersion = this.tokenHash;
      }
      this.startRegister(tokenVersion);
    }.bind(this));
    this.ua.transport.on('transportError',function () {
      this.serverFailure();
    }.bind(this));
  }

  serverFailure(){
    throw Error("Connection to server " + this.ua.transport.server.wsUri + " failed.");
  }

  /**
   * Starts sending the SIP register requests to TONE.
   * Periodic keep-alive register start to be sent until unregistration.
   * @param {!string} token The access token sent as an custom header in full or hashed mode ('X-Tone-token'/'X-Tone-hash').
   */
  startRegister(token){
    var headerName = 'X-Tone-token';
    var options = {
      'extraHeaders': [ headerName +':' + token ]
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
    this.clearAuthInfo();
  }

  /**
   * Cleans-up authentication related fields.
   */
  clearAuthInfo(){
    this.token = null;
    this.tokenHash = null;
    this.firstRegister = false;
  }

  /**
   * Cleans-up call related flags.
   */
  endCleanup(session){
    this.removeSession(session);
    if(Object.keys(this.sessionList).length == 0){
      this.onCall = false;
      this.inviteReceived = false;
    }
  }

  /**
   * Initializes the Session and sets the session event triggers.
   * @param {!Object} session Current session.
   */
  initializeSession(session) {
    session.on('progress', function () {
      var event = Dial.buildEvent('progress', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('accepted', function () {
      var event = Dial.buildEvent('accepted', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('rejected', function () {
      this.endCleanup(session);
      var event = Dial.buildEvent('rejected', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('failed', function () {
      this.endCleanup(session);
      var event = Dial.buildEvent('failed', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('cancel', function () {
      this.endCleanup(session);
      var event = Dial.buildEvent('cancel', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('bye', function () {
      this.endCleanup(session);
      var event = Dial.buildEvent('bye', {'session': session});
      this.sendEvent(event);
    }.bind(this));
    session.on('terminated', function () {
      this.endCleanup(session);
      var event = Dial.buildEvent('terminated', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('reinvite', function () {
      var event = Dial.buildEvent('reinvite', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('replaced', function () {
      var event = Dial.buildEvent('replaced', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('dtmf', function(request, dtmf) {
      var event = Dial.buildEvent('dtmf', {'number': dtmf});
      this.sendEvent(event);
    }.bind(this));
    session.on('SessionDescriptionHandler-created', function () {
      var event = Dial.buildEvent('SessionDescriptionHandler-created', {'session':session});
      this.sendEvent(event);
      // setting up event for failure of user media here
      // since session description handler only exists from this moment on.
      session.sessionDescriptionHandler.on('userMediaFailed', function() {
        this.endCleanup(session);
        var event = Dial.buildEvent('userMediaFailed', {'session':session});
        this.sendEvent(event);
      }.bind(this));
    }.bind(this));
    session.on('directionChanged', function () {
      var event = Dial.buildEvent('directionChanged', {'session':session});
      this.sendEvent(event);
    }.bind(this));
    session.on('referRequested', function(context) {
      this.initializeSession(context.newSession);
      var event = Dial.buildEvent('referRequested', {'session':session});
      this.sendEvent(event);
    }.bind(this));

    this.setSession(session);
    this.addTrackListener(session);
  }

  getDefaultSession(){
    var oldestTime = Number.MAX_SAFE_INTEGER;
    var defaultSession = undefined;
    for (var sessionId in this.sessionList) {
      if (this.sessionList.hasOwnProperty(sessionId)) {
         if(this.sessionList[sessionId].data.timestamp < oldestTime){
           oldestTime = this.sessionList[sessionId].data.timestamp;
           defaultSession = this.sessionList[sessionId];
         }
      }
    }
    return defaultSession;
  }

  getMostRecentSession(){
    var oldestTime = Number.MIN_SAFE_INTEGER;
    var defaultSession = undefined;
    for (var sessionId in this.sessionList) {
      if (this.sessionList.hasOwnProperty(sessionId)) {
         if(this.sessionList[sessionId].data.timestamp > oldestTime){
           oldestTime = this.sessionList[sessionId].data.timestamp;
           defaultSession = this.sessionList[sessionId];
         }
      }
    }
    return defaultSession;
  }

   /**
   * Removes a specific session from the current session list.
   * @param {!object} session The session object.
   */
  removeSession(session){
    if(this.sessionList.hasOwnProperty(session.id)){
      delete this.sessionList[session.id];
    }
  }

  /**
   * Adds a new sessionb to the session list.
   * @param {!object} session The session object.
   */
  setSession(session){
    if(session != null && session != undefined){
      session.data.timestamp = Date.now();
      this.sessionList[session.id] = session;
      var event = Dial.buildEvent('outboundSessionCreated', {'session':session});
      this.sendEvent(event);
    }
  }

  /**
   * Terminates the current Session gracefully.
   */
  terminateSession() {
    var session = this.getDefaultSession();
    if( session!= undefined){
      session.terminate();
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