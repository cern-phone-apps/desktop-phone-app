import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./ColumnHeader.css";

export class ColumnHeader extends Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node
  };
  render() {
    return (
      <header className="padded-item column-header" style={this.props.style}>
        <Grid>{this.props.children}</Grid>
      </header>
    );
  }
}

export default ColumnHeader;
