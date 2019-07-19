import React, { Component } from 'react';
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

const ButtonNumbersList = ({ numbers, connect }) => (
  <div>
    {numbers.map((item, index) => (
      <Button
        fluid
        key={`number-${index}`}
        className="ConnectNumberButton"
        onClick={() => connect(item.phoneNumber)}
      >
        <Icon name="plug" />
        {item.phoneNumber}
      </Button>
    ))}
  </div>
);

ButtonNumbersList.propTypes = {
  numbers: PropTypes.array,
  connect: PropTypes.func.isRequired
};

/**
 * Button to connect a user phone number
 */
export class NumberConnector extends Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired, // Phone Service
    connecting: PropTypes.bool.isRequired,
    numbers: PropTypes.array,
    getUserPhoneNumbers: PropTypes.func.isRequired,
    setActiveNumber: PropTypes.func.isRequired,
    rememberNumber: PropTypes.bool.isRequired,
    setRememberNumber: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserPhoneNumbers, rememberNumber, activeNumber } = this.props;

    const toneToken = ElectronService.getToneToken();

    if (rememberNumber && toneToken && activeNumber) {
      this.connect(activeNumber);
    }

    getUserPhoneNumbers();
  }

  connect = activeNumber => {
    const { phoneService, setActiveNumber } = this.props;

    actionMessage(`Calls | User clicks connect button (${activeNumber})`);

    setActiveNumber(activeNumber);
    const result = phoneService.authenticateUser(activeNumber);
    logMessage(result);
  };

  rememberNumberOnChange = () => {
    logMessage('Remember number on change');
    const { setRememberNumber, rememberNumber } = this.props;

    setRememberNumber(!rememberNumber);
  };

  render() {
    const { connecting, numbers, rememberNumber } = this.props;

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
            <Loader
              active
              inline="centered"
              content="Loading phone numbers..."
            />
          </Dimmer>
        </Segment>
      );
    }

    return (
      <React.Fragment>
        <ButtonNumbersList
          numbers={numbers}
          connect={this.connect}
          connecting={connecting}
        />
        <Form className={styles.rememberNumberForm}>
          <Form.Field>
            <Checkbox
              toggle
              checked={rememberNumber}
              onChange={this.rememberNumberOnChange}
              label="Register automatically the selected phone
            number when app starts."
            />
          </Form.Field>
        </Form>
      </React.Fragment>
    );
  }
}

export default NumberConnector;
