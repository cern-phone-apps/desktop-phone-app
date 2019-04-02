import React, { Component } from "react";
import UserPhoneNumberButtonContainer from "calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer";

export class EuropeanEmergencyCallButton extends Component {
  render() {
    return (
      <UserPhoneNumberButtonContainer
        phoneNumber={`112`}
        icon={`phone`}
        recipientName={`European Emergency`}
      />
    );
  }
}

export default EuropeanEmergencyCallButton;
