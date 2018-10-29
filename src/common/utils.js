import Raven from "raven-js";
import ReactPiwik from "react-piwik";
let debug = require("debug");

/**
 * Initializes the different application's logs methods
 * @type {Function}
 */
let errorMessage = debug("APP:ERROR");
let infoMessage = debug("APP:INFO");
let logMessage = debug("APP:LOG");

/**
 * On production, only error and info will be available.
 * On development and test, logMessage is also available
 */
if (process.env.NODE_ENV === "production") {
  debug.enable("APP:ERROR,APP:INFO");
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

export { errorMessage, infoMessage, logMessage, logEvent };
