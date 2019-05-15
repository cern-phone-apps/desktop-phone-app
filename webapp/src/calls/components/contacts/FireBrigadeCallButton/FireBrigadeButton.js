import React, { Component } from "react";
import UserPhoneNumberButtonContainer from "calls/components/UserPhoneNumberButton/UserPhoneNumberButtonContainer";

export class FireBrigadeButton extends Component {
  render() {
    return (
      <UserPhoneNumberButtonContainer
        phoneNumber={`74444`}
        icon={`phone`}
        recipientName={`Fire Brigade`}
      />
    );
  }
}

export default FireBrigadeButton;
