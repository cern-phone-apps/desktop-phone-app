import React, { Component } from "react";
import { getWindowTitle } from "calls/utils";
import { Responsive } from "semantic-ui-react";
import RightColumnHeader from "common/components/RightColumnHeader/RightColumnHeader";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";
import PropTypes from "prop-types";

export class CallsScreenRightColumnHeader extends Component {
  render() {
    const { connected, onCall, calling } = this.props;

    const title = getWindowTitle(connected, onCall, calling);

    return (
      <>
        <Responsive
          as={RightColumnHeader}
          title={title}
          {...Responsive.onlyComputer}
        />
        <Responsive
          as={LeftColumnHeader}
          title={title}
          {...Responsive.onlyMobile}
        />
        <Responsive
          as={LeftColumnHeader}
          title={title}
          {...Responsive.onlyTablet}
        />
      </>
    );
  }
}

CallsScreenRightColumnHeader.propTypes = { title: PropTypes.any };
