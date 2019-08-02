import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./RightColumn.module.css";

class RightColumn extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  render() {
    return <div className={styles.rightColumn}>{this.props.children}</div>;
  }
}

export default RightColumn;
