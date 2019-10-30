import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import ReactPiwik from 'react-piwik';
import { logMessage } from 'common/utils/logs';
import config from 'config';

export const withLoggerService = WrappedComponent => {
  const WithLoggerService = ({ sendStats, children }) => {
    /**
     * Initializes Raven error logging
     */
    if (sendStats) {
      logMessage(`sendStats: ${sendStats}. We will send stats`);
      Sentry.init({ dsn: config.sentry.DSN });
    } else {
      logMessage(`sendStats: ${sendStats}. We won't send stats`);
    }

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

    return (
      <WrappedComponent logEvent={logEvent} testValue={42}>
        {children}
      </WrappedComponent>
    );
  };

  WithLoggerService.propTypes = {
    sendStats: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  };

  return WithLoggerService;
};

const LogsProvider = withLoggerService(({ children }) => (
  <React.Fragment>{children}</React.Fragment>
));

export default LogsProvider;
