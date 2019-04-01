import React, { Component } from "react";
import PropTypes from "prop-types";

class Timer extends Component {
  static propTypes = {
    startTime: PropTypes.number,
    countDown: PropTypes.bool,
    className: PropTypes.string
  };

  state = {
    now: 0
  };

  static defaultProps = {
    startTime: Date.now(),
    className: "timer",
    countDown: null
  };

  constructor(props) {
    super();
    if (props.startTime > Date.now() && !props.countDown) {
      throw Error("If startTime is in the future, countDown must be true");
    }
  }

  componentWillMount() {
    this.tick();
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.props.countDown
      ? this.setState({ time: this.props.startTime - Date.now() })
      : this.setState({ time: Date.now() - this.props.startTime });
  };

  convertTimeToString = () => {
    return `${this.convertTimeToMinutesString()}:${this.convertTimeToSecondsString()}`;
  };

  convertTimeToMinutesString = () => {
    let minutes = this.convertTimeToMinutes();
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${minutes}`;
  };

  convertTimeToSecondsString = () => {
    let seconds = this.convertTimeToSeconds();
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${seconds}`;
  };

  convertTimeToSeconds = () => {
    let ms = this.state.time;
    const seconds = Math.round(ms / 1000) % 60;
    return seconds;
  };

  convertTimeToMinutes = () => {
    const seconds = Math.round(this.state.time / 1000);
    let minutes = Math.floor(seconds / 60);

    return minutes;
  };

  render() {
    return (
      <div className={this.props.className}>
        <span className={"minutes"}>{this.convertTimeToMinutesString()}</span>:
        <span className={"seconds"}>{this.convertTimeToSecondsString()}</span>
      </div>
    );
  }
}

export default Timer;
