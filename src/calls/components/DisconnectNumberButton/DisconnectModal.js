import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Header, Loader, Modal, Segment } from "semantic-ui-react";
import { logMessage } from "common/utils";

function DisconnectModal({ disconnecting }) {
  logMessage(disconnecting);
  return (
    <Modal size={"mini"} open={disconnecting}>
      <Modal.Content>
        <Modal.Description>
          <Header textAlign="center">Disconnecting...</Header>
          <Segment basic>
            <Dimmer active inverted>
              <Loader size="small" />
            </Dimmer>
          </Segment>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

DisconnectModal.propTypes = {
  disconnecting: PropTypes.bool.isRequired
};

export default DisconnectModal;
