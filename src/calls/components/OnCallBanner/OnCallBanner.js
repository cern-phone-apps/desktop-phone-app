import React, { Component } from "react";

import "./OnCallBanner.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";
import Timer from "calls/components/Timer/Timer";

export class OnCallBanner extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    caller: PropTypes.object.isRequired
  };

  render() {
    const { t, caller } = this.props;
    return (
      <Link to={"/"} className={"padded-item OnCallMessage"}>
        <Timer startTime={caller.startTime} /> -{" "}
        {t("onCallWithText")} {caller.name}
      </Link>
    );
  }
}

export default translate("calls")(OnCallBanner);
