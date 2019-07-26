import React, { useEffect, useState } from 'react';

import { Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { openSettingsModal } from 'settings/actions/modal';
import dialBackendApi from 'services/api';
import styles from './CallForwardingBanner.module.css';

const isCallForwardingEnabled = (
  callForwardingStatus,
  simultaneousRingingStatus
) => {
  let result = false;
  if (callForwardingStatus || simultaneousRingingStatus) {
    result = true;
  }
  return result;
};

export function CallForwardingBanner() {
  /**
   * Hooks
   */
  const [callForwardingEnabled, setCallForwardingEnabled] = useState(false);
  const dispatch = useDispatch();
  const activeNumber = useSelector(state => state.numbers.activeNumber);

  /**
   * Properties
   */
  const callForwardingStatus = useSelector(
    state => state.callForwarding.status
  );
  let timer = null;
  let mounted = false;
  const timerTime = 60000;
  /**
   * Functions
   */
  const openModal = () => dispatch(openSettingsModal());
  const getCallForwardingStatus = extension =>
    dispatch(dialBackendApi().getCallForwardingStatus(extension));

  const fetchCallForwardingStatus = async () => {
    const forwardingData = await getCallForwardingStatus(activeNumber);
    if (
      forwardingData &&
      forwardingData.payload &&
      forwardingData.payload.success
    ) {
      // Obtain values from the payload
      const { payload } = forwardingData;

      const status = isCallForwardingEnabled(
        payload['call-forwarding'],
        payload['simultaneous-ring']
      );

      setCallForwardingEnabled(status);
    }
  };

  useEffect(() => {
    // Didmount and willUpdated
    mounted = true;
    fetchCallForwardingStatus();
    timer = setInterval(() => {
      if (mounted) {
        fetchCallForwardingStatus();
      }
    }, timerTime);

    return () => {
      // Unmounting...
      mounted = false;
      clearTimeout(timer);
    };
    // If the following value changes
  }, [
    callForwardingStatus['call-forwarding'],
    callForwardingStatus['simultaneous-ring']
  ]);

  if (callForwardingEnabled) {
    return (
      <div
        onClick={openModal}
        role="button"
        onKeyPress={openModal}
        tabIndex="0"
        className={`padded-item ${styles.callForwardingMessage}`}
      >
        <Icon name="warning sign" /> {'Call Forwarding is enabled'}
      </div>
    );
  }
  return null;
}

export default CallForwardingBanner;
