import React, {Component} from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import PhoneRingingIcon from "calls/components/PhoneRingingIcon/PhoneRingingIcon";
import { translate } from "react-i18next";

export class OutgoingCallModal extends Component {

  static propTypes = {
    t: PropTypes.func.isRequired, // Translate service
    phoneService: PropTypes.object.isRequired, // Phone service
    recipientName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  };

  /**
   * Hangups the current call using the Phone Service
   */
  hangUpCurrentCall = () => {
    const { phoneService } = this.props;
    phoneService.hangUpCurrentCall();
  };

  render() {
    const { t, recipientName, phoneNumber } = this.props;
    return (
      <Modal
        open={this.props.modalOpen}
        size="small"
      >
        <Header icon="phone" content="Calling..." />
        <Modal.Content>
          <div>
            <div className="ui center aligned basic segment">
              <PhoneRingingIcon />
            </div>
            <h3 className="ui center aligned header">
              {t("callingText")}{" "}
              {recipientName}
            </h3>
            <div className="ui center aligned basic segment">
              ({phoneNumber})
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.hangUpCurrentCall}>
            <Icon name="phone" /> Hangup
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate("calls")(OutgoingCallModal)