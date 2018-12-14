import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Dimmer, Icon, Loader, Segment } from "semantic-ui-react";
import { actionMessage, logMessage } from "common/utils/logs";

const ButtonNumbersList = ({ numbers, connect }) => {
  return (
    <div>
      {numbers.map((item, index) => {
        return (
          <Button
            fluid
            key={`number-${index}`}
            className={"ConnectNumberButton"}
            onClick={() => connect(item.phoneNumber)}
          >
            <Icon name="plug" />
            {item.phoneNumber}
          </Button>
        );
      })}
    </div>
  );
};

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
    setActiveNumber: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserPhoneNumbers } = this.props;
    getUserPhoneNumbers();
  }

  connect = activeNumber => {
    const { phoneService, setActiveNumber } = this.props;

    actionMessage(`Calls | User clicks connect button (${activeNumber})`);

    setActiveNumber(activeNumber);
    const result = phoneService.authenticateUser(activeNumber);
    logMessage(result);
  };

  render() {
    let { connecting, numbers } = this.props;

    if (connecting) {
      return (
        <Segment padded basic textAlign={"center"}>
          <Dimmer active inverted>
            <Loader active inline="centered" content="Connecting..." />
          </Dimmer>
        </Segment>
      );
    }

    if (numbers === undefined || numbers.length === 0) {
      return (
        <Segment padded basic textAlign={"center"}>
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
      <ButtonNumbersList
        numbers={numbers}
        connect={this.connect}
        connecting={connecting}
      />
    );
  }
}

export default NumberConnector;
