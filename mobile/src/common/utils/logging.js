/* eslint-disable no-console */

import { AsyncStorage } from 'react-native';

const debug = require('debug');

const clearLog = async () => {
  await AsyncStorage.setItem('logs', JSON.stringify([]));
};

const retrieveData = async () => {
  let existingEntries;
  try {
    const value = await AsyncStorage.getItem('logs');
    if (value !== null) {
      // We have data!!
      // console.log(value);
      existingEntries = JSON.parse(value);
    } else {
      existingEntries = [];
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
  return existingEntries;
};

const simpleStringify = object => {
  const simpleObject = Object.keys(object).reduce((result, key) => {
    if (typeof object[key] === 'object') {
      return result;
    }
    if (typeof object[key] === 'function') {
      return result;
    }
    return { ...result, [key]: object[key] };
  }, {});
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

const addEntry = async entry => {
  if (process.env.CI === true) {
    return;
  }
  const existingEntries = await retrieveData();

  try {
    JSON.stringify(entry);
    existingEntries.push(entry);
  } catch (TypeError) {
    existingEntries.push(simpleStringify(entry));
  }

  try {
    await AsyncStorage.setItem('logs', JSON.stringify(existingEntries));
  } catch (error) {
    console.log(error);
    clearLog();
  }
};

// Overload console.log function
(() => {
  // saving the original console.log function
  const preservedConsoleLog = console.log;

  /**
   * Variant of console.log that prints a timestamp after a message
   * and logs to AsyncStorage in addition to the console
   */
  console.log = (...args) => {
    const currentDate = `| ${new Date().toUTCString()} `;
    preservedConsoleLog.apply(console, [...args, currentDate]);

    addEntry([...args, currentDate]);
  };
})();

clearLog();

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

export {
  errorMessage,
  warnMessage,
  infoMessage,
  logMessage,
  toneInMessage,
  toneOutMessage,
  actionMessage
};
