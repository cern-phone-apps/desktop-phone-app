import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Icon, Loader, Segment } from "semantic-ui-react";
import { logMessage } from "common/utils";

const ButtonNumbersList = ({ numbers, connect }) => {
  if (numbers === undefined || numbers === []) {
    return "";
  }
  return (
    <div>
      {numbers.map((item, index) => {
        return (
          <Button
            fluid
            key={`number-${index}`}
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

class ConnectNumberButton extends Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired, // Phone Service
    connecting: PropTypes.bool.isRequired,
    numbers: PropTypes.array,
    getUserPhoneNumbers: PropTypes.func.isRequired,
    setActiveNumber: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {getUserPhoneNumbers} = this.props;
    getUserPhoneNumbers();
  }

  connect = activeNumber => {
    const {phoneService, setActiveNumber} = this.props;

    setActiveNumber(activeNumber);
    const result = phoneService.authenticateUser(
      activeNumber,
      activeNumber
    );
    logMessage(result);
  };

  render() {
    const { connecting, numbers } = this.props;

    if (connecting) {
      return (
        <Segment basic textAlign={"center"}>
          <Loader active inline="centered" content="Connecting..." />
        </Segment>
      );
    }

    return (
      <ButtonNumbersList
        numbers={numbers}
        connect={this.connect}
      />
    );
  }
}

export default ConnectNumberButton;
