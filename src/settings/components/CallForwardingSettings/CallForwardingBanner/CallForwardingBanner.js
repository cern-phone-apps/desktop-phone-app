import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Icon } from 'semantic-ui-react';
import { openSettingsModal } from 'settings/actions/modal';
import dialBackendApi from 'services/api';
import styles from './CallForwardingBanner.module.css';

export function CallForwardingBanner() {
  /**
   * Hooks
   */
  const dispatch = useDispatch();
  const activeNumber = useSelector(state => state.numbers.activeNumber);
  const callForwardingStatus = useSelector(
    state => state.callForwarding.status['call-forwarding']
  );
  const simRingingStatus = useSelector(
    state => state.callForwarding.status['simultaneous-ring']
  );
  const lastOperationResultMessage = useSelector(state =>
    state.callForwarding.lastOperationResult
      ? state.callForwarding.lastOperationResult
      : ''
  );

  /**
   * Functions
   */
  const openModal = () => dispatch(openSettingsModal());

  useEffect(() => {
    const timerTime = 60000;
    const getCallForwardingStatus = extension =>
      dispatch(dialBackendApi().getCallForwardingStatus(extension));

    const fetchCallForwardingStatus = async () => {
      await getCallForwardingStatus(activeNumber);
    };

    // Didmount and willUpdated
    fetchCallForwardingStatus();
    const timer = setInterval(() => {
      fetchCallForwardingStatus();
    }, timerTime);

    return () => {
      // Unmounting...
      clearTimeout(timer);
    };
    // If the following value changes
  }, [lastOperationResultMessage, dispatch, activeNumber]);

  if (callForwardingStatus || simRingingStatus) {
    return (
      <div
        onClick={openModal}
        role="button"
        onKeyPress={openModal}
        tabIndex="0"
        aria-label="Call Forwarding is enabled"
        className={`padded-item ${styles.callForwardingMessage}`}
      >
        <Icon name="warning sign" /> {'Call Forwarding is enabled'}
      </div>
    );
  }
  return null;
}

export default CallForwardingBanner;
