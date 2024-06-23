import React, { useState, useEffect } from 'react';

const Stopwatch = ({ isPlaying, isResult }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      setRunning(true);
    }
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (!isPlaying || (isPlaying && isResult)) {
      setRunning(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, running, isResult]);

  useEffect(() => {
    if (!isPlaying) {
      setTime(0);
    }
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return <div className="flex items-center justify-center py-10 font-semibold text-5xl">{formatTime(time)}</div>;
};

export default Stopwatch;
