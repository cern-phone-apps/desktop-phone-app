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

const toneInMessage = message => {
  logger.info(`%cTONE_IN | ${JSON.stringify(message)}`, 'color: red');
};
const toneOutMessage = message => {
  logger.info(`%cTONE_OUT | ${JSON.stringify(message)}`, 'color: blue');
};
const infoMessage = message => {
  logger.info(JSON.stringify(message));
};
const errorMessage = message => {
  logger.error(JSON.stringify(message));
};
const warnMessage = message => {
  logger.warn(JSON.stringify(message));
};
const actionMessage = message => {
  logger.warn(`ACTION | ${JSON.stringify(message)}`);
};
const logMessage = message => {
  logger.info(JSON.stringify(message));
};

const systemInfoMessage = message => {
  logger.info(`SYSTEM | ${JSON.stringify(message)}`);
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
