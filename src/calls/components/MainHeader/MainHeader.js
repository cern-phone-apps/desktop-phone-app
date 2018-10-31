import React, { Component } from "react";
import { getWindowTitle } from "calls/utils";
import { Responsive } from "semantic-ui-react";
import PropTypes from "prop-types";

import RightColumnHeader from "common/components/RightColumnHeader/RightColumnHeader";
import LeftColumnHeader from "common/components/LeftColumnHeader/LeftColumnHeader";

export class MainHeader extends Component {
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

MainHeader.propTypes = { title: PropTypes.any };
