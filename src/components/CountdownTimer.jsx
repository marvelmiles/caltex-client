import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CountdownTimer = ({ onTimeUp, delay = 60 }) => {
  const [seconds, setSeconds] = useState(delay);

  useEffect(() => {
    let timer;

    if (seconds === 0) onTimeUp && onTimeUp();
    else {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [onTimeUp, seconds]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <span>{seconds === 0 ? "Time's up!" : formatTime(seconds)}</span>;
};

CountdownTimer.propTypes = {};

export default CountdownTimer;
