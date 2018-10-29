import React, { Component } from "react";

import "./OnCallMessage.css";
import PropTypes from "prop-types";
import Timer from "simple-react-timer";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

export class OnCallMessage extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    recipient: PropTypes.object.isRequired
  };

  render() {
    const { t, recipient } = this.props;
    return (
      <Link to={"/"} className={"padded-item OnCallMessage"}>
        <Timer startTime={recipient.startTime} /> -{" "}
        {t("onCallWithText")} {recipient.name}
      </Link>
    );
  }
}

export default translate("calls")(OnCallMessage);
