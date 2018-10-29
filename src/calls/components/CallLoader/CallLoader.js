import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CallLoader.css";
import { translate } from "react-i18next";
import PhoneRingingIcon from "calls/components/PhoneRingingIcon/PhoneRingingIcon";
import { Grid, Segment } from "semantic-ui-react";

/**
 * Displays the screen when making a call
 */
export class CallLoader extends Component {
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
      <Segment textAlign={"center"} basic>
        <Grid columns={1}>
          <Grid.Column>
            <Segment textAlign={"center"}>
              <div>
                <div className="ui center aligned basic segment">
                  <PhoneRingingIcon />
                </div>
                <h3 className="ui center aligned header">
                  {t("callingText")}{" "}
                  <img
                    src={"/images/avatar/patrick.png"}
                    alt={"avatar"}
                    className="ui circular tiny image"
                  />{" "}
                  {recipientName}
                </h3>
                <div className="ui center aligned basic segment">
                  ({phoneNumber})
                </div>
              </div>
              <div className="ui center aligned basic segment">
                <button
                  onClick={this.hangUpCurrentCall}
                  className="ui circular red icon button"
                >
                  <i className="phone icon" />
                </button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default translate("calls")(CallLoader);
