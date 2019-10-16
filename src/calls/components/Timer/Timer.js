import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a timer from an specified start time
 * @param {startTime} number The start time of the timer (I.e. Date.now())
 * @param {className} string Additional class applied to the component
 */
function Timer({ startTime, className }) {
  const [time, setTime] = useState(0);

  const convertTimeToMinutes = () => {
    const seconds = Math.round(time / 1000);
    const minutes = Math.floor(seconds / 60);

    return minutes;
  };

  const convertTimeToSeconds = () => {
    const ms = time;
    const seconds = Math.round(ms / 1000) % 60;
    return seconds;
  };

  const convertTimeToMinutesString = () => {
    let minutes = convertTimeToMinutes();
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${minutes}`;
  };

  const convertTimeToSecondsString = () => {
    let seconds = convertTimeToSeconds();
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${seconds}`;
  };

  useEffect(() => {
    const tick = () => {
      setTime(Date.now() - startTime);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [startTime]);

  return (
    <div className={className}>
      <span className="minutes" aria-label="Minutes">
        {convertTimeToMinutesString()}
      </span>
      :
      <span className="seconds" aria-label="Seconds">
        {convertTimeToSecondsString()}
      </span>
    </div>
  );
}

Timer.propTypes = {
  startTime: PropTypes.number,
  className: PropTypes.string
};

Timer.defaultProps = {
  startTime: Date.now(),
  className: ''
};

export default Timer;
