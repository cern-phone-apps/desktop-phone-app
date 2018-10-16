import Raven from 'raven-js'
import ReactPiwik from 'react-piwik'

let debug = require('debug');

let errorMessage = debug('APP:ERROR');
let infoMessage = debug('APP:INFO');
let logMessage = debug('APP:LOG');

if (process.env.NODE_ENV === 'production') {
  debug.enable('APP:ERROR,APP:INFO')
} else {
  debug.enable('APP:*')
}

Raven
  .config(process.env.REACT_APP_SENTRY_DSN)
  .install()

const logEvent = (category, method, message='') => {
  if (process.env.NODE_ENV !== 'test') {
    ReactPiwik.push(['trackEvent', category,method, message]);
  }else{
    logMessage(message)
  }
}


export {errorMessage, infoMessage, logMessage, logEvent}
