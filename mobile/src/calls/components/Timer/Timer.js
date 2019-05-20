import React from 'react';
import { Text } from 'react-native';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer + 1 })),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  convertTimeToSeconds = () => {
    const { timer } = this.state;
    return Math.round(timer % 60);
  };

  convertTimeToMinutes = () => {
    const { timer } = this.state;
    return Math.floor(timer / 60);
  };

  convertTimeToMinutesString = () => {
    let minutes = this.convertTimeToMinutes();
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return minutes;
  };

  convertTimeToSecondsString = () => {
    let seconds = this.convertTimeToSeconds();
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return seconds;
  };

  convertTimeToString = () => {
    return `${this.convertTimeToMinutesString()}:${this.convertTimeToSecondsString()}`;
  };

  render() {
    return <Text {...this.props}>{this.convertTimeToString()}</Text>;
  }
}

export default Timer;
