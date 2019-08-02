import Raven from 'raven-js';
import ReactPiwik from 'react-piwik';

import log from 'electron-log';

const { remote } = window.require('electron');
const remoteLog = remote.require('electron-log');

const logFormat = '{level} | {y}-{m}-{d} {h}:{i}:{s}:{ms} | {text}';
log.transports.file.level = false;
if (process.env.NODE_ENV === 'production') {
  log.transports.console.level = false;
} else {
  log.transports.console.level = 'debug';
  log.transports.console.format = logFormat;
}

(() => {
  // saving the original console.log function
  // const preservedConsoleLog = console.log;
  // const preservedConsoleError = console.error;
  // overriding console.log function
  function customLog() {
    // we can't just call to `preservedConsoleLog` function,
    // that will throw an error (TypeError: Illegal invocation)
    // because we need the function to be inside the
    // scope of the `console` object so we going to use the
    // `apply` function
    if (process.env.NODE_ENV !== 'production') {
      log.info(`LOG | ${JSON.stringify(arguments)}`);
    }
    remoteLog.info(`LOG | ${JSON.stringify(arguments)}`);
  }

  function customError() {
    // we can't just call to `preservedConsoleLog` function,
    // that will throw an error (TypeError: Illegal invocation)
    // because we need the function to be inside the
    // scope of the `console` object so we going to use the
    // `apply` function
    if (process.env.NODE_ENV !== 'production') {
      log.error(`ERROR | ${JSON.stringify(arguments)}`);
    }
    remoteLog.error(`ERROR | ${JSON.stringify(arguments)}`);
  }

  console.log = customLog;
  console.error = customError;
})();

let logger;
if (process.env.NODE_ENV !== 'production') {
  logger = log;
} else {
  logger = remoteLog;
}

const simpleStringify = object => {
  const simpleObject = {};
  Object.keys(object).forEach(prop => {
    if (
      Object.prototype.hasOwnProperty.call(object, prop) &&
      typeof object[prop] !== 'object' &&
      typeof object[prop] !== 'function'
    ) {
      simpleObject[prop] = object[prop];
    }
  });
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

const printParsedMessage = (
  message,
  loggerType = 'info',
  messageType = 'info'
) => {
  let parsedMessage;
  try {
    parsedMessage = JSON.stringify(message);
  } catch (TypeError) {
    parsedMessage = simpleStringify(message);
  }

  if (loggerType === 'info') {
    logger.info(`${messageType} | ${parsedMessage}`);
  }
  if (loggerType === 'error') {
    logger.error(`${messageType} | ${parsedMessage}`);
  }
  if (loggerType === 'warn') {
    logger.warn(`${messageType} | ${parsedMessage}`);
  }
};

const toneInMessage = message => {
  printParsedMessage(message, 'info', '%cTONE_IN');
};

const toneOutMessage = message => {
  printParsedMessage(message, 'info', '%cTONE_OUT');
};
const infoMessage = message => {
  printParsedMessage(message);
};
const errorMessage = message => {
  printParsedMessage(message, 'error', 'error');
};
const warnMessage = message => {
  printParsedMessage(message, 'warn', 'warn');
};
const actionMessage = message => {
  printParsedMessage(message, 'info', 'ACTION');
};
const logMessage = message => {
  printParsedMessage(message);
};

const systemInfoMessage = message => {
  printParsedMessage(message, 'info', 'SYSTEM');
};

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
  if (process.env.NODE_ENV === 'production') {
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
  logEvent,
  systemInfoMessage
};
