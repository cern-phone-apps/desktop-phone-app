import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

/**
 * Represents a button on the Dialpad
 * @param props
 * @returns {*}
 * @constructor
 */
export class DialButton extends Component {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    alt: PropTypes.string,
    longPressTimeout: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired,
    longPressHandler: PropTypes.func.isRequired
  };

  static defaultProps = {
    longPressTimeout: 300
  };

  state = {
    startTime: null
  };

  handleDialPadButtonDown = () => {
    this.setState({
      startTime: new Date()
    });
  };

  isLongPress = () => {
    return new Date() - this.state.startTime > this.props.longPressTimeout;
  };

  handleDialPadButtonLongPressRelease () {
    if (!this.isLongPress() || !this.props.alt) {
      this.props.clickHandler(this.props.symbol);
    } else {
      this.props.longPressHandler(this.props.alt);
    }
    this.setState({
      startTime: null
    });
  }

  render () {
    return (
      <Grid.Column textAlign={"center"}>
        <div
          className={"DialButton DialButton__number"}
          onMouseDown={() => this.handleDialPadButtonDown()}
          onMouseUp={() => this.handleDialPadButtonLongPressRelease()}
        >
          <div className={"DialButton__content"}>
            {this.props.symbol}{" "}
            {this.props.alt ? <span className={"DialButton__alt"}>+</span> : ""}
          </div>
        </div>
      </Grid.Column>
    );
  }
}