import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dimmer,
  Icon,
  Loader,
  Segment,
  Checkbox,
  Form
} from 'semantic-ui-react';
import { actionMessage, logMessage } from 'common/utils/logs';
import ElectronService from 'services/electron-service';
import styles from './NumberConnector.module.css';

function NoNumbersButton({ numbersLength }) {
  if (numbersLength === 0) {
    return (
      <Button fluid className="ConnectNumberButton" disabled>
        There are no phone numbers in this section.
      </Button>
    );
  }
  return null;
}

const ButtonNumbersList = ({ numbers, connect, onlineStatus }) => (
  <React.Fragment>
    <div>
      <h4>Personal</h4>
      {numbers.personal.map((item, index) => (
        <Button
          fluid
          key={`number-${index.toString()}`}
          className="ConnectNumberButton"
          onClick={() => connect(item)}
          disabled={!onlineStatus}
        >
          <Icon name="plug" />
          {item}
        </Button>
      ))}
      <NoNumbersButton numbersLength={numbers.personal.length} />
    </div>
    <div style={{ marginTop: 10 }}>
      <h4>Shared</h4>
      {numbers.shared.map((item, index) => (
        <Button
          fluid
          key={`number-${index.toString()}`}
          className="ConnectNumberButton"
          onClick={() => connect(item)}
          disabled={!onlineStatus}
        >
          <Icon name="plug" />
          {item}
        </Button>
      ))}
      <NoNumbersButton numbersLength={numbers.shared.length} />
    </div>
  </React.Fragment>
);
ButtonNumbersList.propTypes = {
  numbers: PropTypes.shape({
    personal: PropTypes.arrayOf(PropTypes.string),
    shared: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  connect: PropTypes.func.isRequired
};

/**
 * Button to connect a user phone number
 */
function NumberConnector({
  getUserPhoneNumbers,
  rememberNumber,
  activeNumber,
  numberOfMobileNumbers,
  firstNumberAvailable,
  setActiveNumber,
  phoneService,
  connecting,
  numbers,
  onlineStatus,
  setRememberNumber
}) {
  const connect = useCallback(
    numberToConnect => {
      actionMessage(`Calls | User clicks connect button (${numberToConnect})`);

      setActiveNumber(numberToConnect);
      phoneService.authenticateUser(numberToConnect);
    },
    [setActiveNumber, phoneService]
  );

  useEffect(() => {
    const toneToken = ElectronService.getToneToken();

    if (rememberNumber && toneToken && activeNumber) {
      connect(activeNumber);
      return;
    }

    getUserPhoneNumbers().then(() => {
      if (numberOfMobileNumbers === 1) {
        connect(firstNumberAvailable);
      }
    });
  }, [
    activeNumber,
    connect,
    getUserPhoneNumbers,
    numberOfMobileNumbers,
    rememberNumber,
    firstNumberAvailable
  ]);

  const rememberNumberOnChange = () => {
    logMessage('Remember number on change');
    setRememberNumber(!rememberNumber);
  };

  // const { connecting, numbers, rememberNumber, onlineStatus } = props;

  if (connecting) {
    return (
      <Segment padded basic textAlign="center">
        <Dimmer active inverted>
          <Loader active inline="centered" content="Connecting..." />
        </Dimmer>
      </Segment>
    );
  }

  if (numbers === undefined || numbers.length === 0) {
    return (
      <Segment padded basic textAlign="center">
        <Dimmer active inverted>
          <Loader active inline="centered" content="Loading phone numbers..." />
        </Dimmer>
      </Segment>
    );
  }
  logMessage(`Online status: ${onlineStatus}`);
  return (
    <React.Fragment>
      <ButtonNumbersList
        numbers={numbers}
        connect={connect}
        connecting={connecting}
        onlineStatus={onlineStatus}
      />
      <Form className={styles.rememberNumberForm}>
        <Form.Field>
          <Checkbox
            toggle
            checked={rememberNumber}
            onChange={rememberNumberOnChange}
            label="Register automatically the selected phone
            number when app starts."
          />
        </Form.Field>
      </Form>
    </React.Fragment>
  );
}

NumberConnector.propTypes = {
  phoneService: PropTypes.shape({
    authenticateUser: PropTypes.func.isRequired
  }).isRequired, // Phone Service
  connecting: PropTypes.bool.isRequired,
  numbers: PropTypes.shape({
    personal: PropTypes.arrayOf(PropTypes.string),
    shared: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  getUserPhoneNumbers: PropTypes.func.isRequired,
  setActiveNumber: PropTypes.func.isRequired,
  rememberNumber: PropTypes.bool.isRequired,
  setRememberNumber: PropTypes.func.isRequired,
  activeNumber: PropTypes.string.isRequired
};

export default NumberConnector;
