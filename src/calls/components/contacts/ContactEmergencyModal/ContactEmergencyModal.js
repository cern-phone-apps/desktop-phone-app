import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Modal } from "semantic-ui-react";
import FireBrigadeButton from "calls/components/contacts/FireBrigadeCallButton/FireBrigadeButton";
import EuropeanEmergencyCallButton from "calls/components/contacts/EuropeanEmergencyCallButton/EuropeanEmergencyCallButton";

class ContactEmergencyModal extends Component {
  static propTypes = {
    emergencyModalOpen: PropTypes.bool.isRequired,
    closeEmergencyModal: PropTypes.func.isRequired
  };

  handleClose = () => {
    const { closeEmergencyModal } = this.props;
    closeEmergencyModal();
  };

  render() {
    const { emergencyModalOpen } = this.props;

    return (
      <Modal
        dimmer={`blurring`}
        size="tiny"
        open={emergencyModalOpen}
        onClose={this.handleClose}
        closeIcon
      >
        <Header>
          <Icon name="emergency" color={"red"} />
          <Header.Content>
            {"In case of emergency"}
            <Header.Subheader />
          </Header.Content>
        </Header>
        <Modal.Content scrolling>
          <Header as={"h4"}>
            Fire - Accident - Pollution - Medical emergencies
          </Header>
          <p>
            In case of FIRE - ACCIDENT or POLLUTION or MEDICAL EMERGENCY on the
            CERN Site, call the Fire Brigade on <strong>74444, 24h/24</strong>.
          </p>
          <p>
            <FireBrigadeButton />
          </p>
          <Header as={"h4"}>Emergencies outside CERN</Header>
          <p>Appel d'urgence Européen - European Emergency call</p>
          <p>
            <EuropeanEmergencyCallButton />
          </p>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ContactEmergencyModal;
