import React, { useEffect, useRef, useState } from "react";

const Stopwatch = ({ isPlaying, isResult,setTime,time,stopwatchrun }) => {
  
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying && !stopwatchrun && !isResult ) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, isResult,stopwatchrun]);

  useEffect(() => {
    
      setTime(0);
    
  }, []);
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
