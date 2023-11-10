import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { VERIFIC_TOKEN_TIMER } from "../config/constants";

const CountdownTimer = ({ onTimeUp, delay = 30 }) => {
  const [seconds, setSeconds] = useState(
    Number(localStorage.getItem(VERIFIC_TOKEN_TIMER)) || delay
  );

  useEffect(() => {
    let timer;

    if (seconds === 0) {
      clearInterval(timer);
      onTimeUp && onTimeUp();
    } else {
      timer = setInterval(() => {
        const sec = seconds - 1;

        localStorage.setItem(VERIFIC_TOKEN_TIMER, sec + "");

        setSeconds(sec);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
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
