import Raven from 'raven-js';
import ReactPiwik from 'react-piwik';

const debug = require('debug');

const clearLog = () => {
  localStorage.setItem('logs', JSON.stringify([]));
};

const simpleStringify = object => {
  const simpleObject = {};
  for (const prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] === 'object') {
      continue;
    }
    if (typeof object[prop] === 'function') {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

const addEntry = entry => {
  if (process.env.CI === true) {
    return;
  }
  let newEntry = entry;
  // Parse any JSON previously stored in allEntries
  let existingEntries = JSON.parse(localStorage.getItem('logs'));
  if (existingEntries == null) existingEntries = [];
  // localStorage.setItem("entry", JSON.stringify(entry));
  // Save allEntries back to local storage
  // console.log(simpleStringify(entry));
  try {
    JSON.stringify(newEntry);
  } catch (TypeError) {
    newEntry = simpleStringify(newEntry);
  }
  existingEntries.push(entry);
  try {
    localStorage.setItem('logs', JSON.stringify(existingEntries));
  } catch (QuotaExceededError) {
    clearLog();
  }
};

clearLog();

(() => {
  // saving the original console.log function
  const preservedConsoleLog = console.log;
  const preservedConsoleError = console.error;
  // overriding console.log function
  function customLog() {
    // we can't just call to `preservedConsoleLog` function,
    // that will throw an error (TypeError: Illegal invocation)
    // because we need the function to be inside the
    // scope of the `console` object so we going to use the
    // `apply` function
    const currentDate = `| ${new Date().toUTCString()} `;
    preservedConsoleLog.apply(console, [...arguments, currentDate]);

    addEntry([...arguments, currentDate]);
  }

  function customError() {
    // we can't just call to `preservedConsoleLog` function,
    // that will throw an error (TypeError: Illegal invocation)
    // because we need the function to be inside the
    // scope of the `console` object so we going to use the
    // `apply` function
    const currentDate = `| ${new Date().toUTCString()} `;
    preservedConsoleError.apply(console, [...arguments, currentDate]);

    addEntry([...arguments, currentDate]);
  }

  console.log = customLog;
  console.error = customError;
})();

/**
 * Initializes the different application's logs methods
 * @type {Function}
 */
const errorMessage = debug('APP:ERROR');
const warnMessage = debug('APP:WARN');
const infoMessage = debug('APP:INFO');
const logMessage = debug('APP:LOG');

const toneMessage = infoMessage.extend('TONE');
const toneInMessage = toneMessage.extend('TONE_IN');
const toneOutMessage = toneMessage.extend('TONE_OUT');

const actionMessage = infoMessage.extend('ACTION');

/**
 * On production, only error and info will be available.
 * On development and test, logMessage is also available
 */
if (process.env.NODE_ENV === 'production') {
  debug.enable('APP:ERROR,APP:INFO,APP:INFO:*');
} else {
  debug.enable('APP:*');
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
const logEvent = (category, method, message = '') => {
  if (process.env.NODE_ENV !== 'test') {
    ReactPiwik.push(['trackEvent', category, method, message]);
  } else {
    logMessage(message);
  }
};

export {
  errorMessage,
  warnMessage,
  infoMessage,
  logMessage,
  toneInMessage,
  toneOutMessage,
  actionMessage,
  logEvent
};
