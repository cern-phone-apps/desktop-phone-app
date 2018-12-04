import Raven from "raven-js";
import ReactPiwik from "react-piwik";
let debug = require("debug");

const clearLog = () => {
  localStorage.setItem("logs", JSON.stringify([]));
};

const addEntry = entry => {
  // Parse any JSON previously stored in allEntries
  let existingEntries = JSON.parse(localStorage.getItem("logs"));
  if (existingEntries == null) existingEntries = [];
  // localStorage.setItem("entry", JSON.stringify(entry));
  // Save allEntries back to local storage
  existingEntries.push(entry);
  localStorage.setItem("logs", JSON.stringify(existingEntries));
};

clearLog();

(function() {
  //saving the original console.log function
  var preservedConsoleLog = console.log;

  //overriding console.log function
  console.log = function() {
    //we can't just call to `preservedConsoleLog` function,
    //that will throw an error (TypeError: Illegal invocation)
    //because we need the function to be inside the
    //scope of the `console` object so we going to use the
    //`apply` function
    var currentDate = "| " + new Date().toUTCString() + " ";
    preservedConsoleLog.apply(console, [...arguments, currentDate]);

    addEntry([...arguments, currentDate]);
    // //and lastly, my addition to the `console.log` function
    // if(application.socket){
    //   application.socket.emit('console.log', arguments);
    // }
  };
})();

/**
 * Initializes the different application's logs methods
 * @type {Function}
 */
let errorMessage = debug("APP:ERROR");
let infoMessage = debug("APP:INFO");
let logMessage = debug("APP:LOG");

let toneMessage = infoMessage.extend("TONE");
let toneInMessage = toneMessage.extend("TONE_IN");
let toneOutMessage = toneMessage.extend("TONE_OUT");

let actionMessage = infoMessage.extend("ACTION");

/**
 * On production, only error and info will be available.
 * On development and test, logMessage is also available
 */
if (process.env.NODE_ENV === "production") {
  debug.enable("APP:ERROR,APP:INFO,APP:INFO:*");
} else {
  debug.enable("APP:*");
}

/**
 * Initializes Raven error logging
 */
Raven.config(process.env.REACT_APP_SENTRY_DSN).install();

/**
 * Logs all the events to Piwik if the environment is not test
 * @param category (string) Category of the event
 * @param method (string) Method of the event
 * @param message (string) Message to display
 */
const logEvent = (category, method, message = "") => {
  if (process.env.NODE_ENV !== "test") {
    ReactPiwik.push(["trackEvent", category, method, message]);
  } else {
    logMessage(message);
  }
};

export {
  errorMessage,
  infoMessage,
  logMessage,
  toneInMessage,
  toneOutMessage,
  actionMessage,
  logEvent
};
