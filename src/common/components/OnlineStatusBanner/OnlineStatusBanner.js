import React, { useEffect, useCallback } from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { logMessage } from 'common/utils/logs';
import styles from './OnlineStatusBanner.module.css';

function OnlineStatusBanner({ onlineStatus, setOnlineStatus, authError, style }) {
  logMessage('Loading OnlineStatusBanner');
  const setAppOnlineStatus = useCallback(() => {
    setOnlineStatus(navigator.onLine);
  }, [setOnlineStatus]);

  useEffect(() => {
    setAppOnlineStatus();
  }, [setAppOnlineStatus]);

  useEffect(() => {
    logMessage('Calling useEffect');
    window.addEventListener('online', setAppOnlineStatus);
    window.addEventListener('offline', setAppOnlineStatus);
    return () => {
      window.removeEventListener('online', setAppOnlineStatus);
      window.removeEventListener('offline', setAppOnlineStatus);
    };
  }, [setAppOnlineStatus]);
  console.log(authError);
  if (onlineStatus && authError !== "DB-42") {
    return null;
  }
  return (
    <div className={`padded-item ${styles.callForwardingMessage}`} style={style}>
      <Icon name="warning sign" />{(!onlineStatus) ? "You are currently offline. Please, check your network connection" : ""}
      {(authError === "DB-42" && onlineStatus) ? "We couldn't provide you a new access token. But you are still able to make calls." : ""}
    </div>
  );
}

OnlineStatusBanner.propTypes = {
  onlineStatus: PropTypes.bool.isRequired,
  setOnlineStatus: PropTypes.func.isRequired
};

export default OnlineStatusBanner;
