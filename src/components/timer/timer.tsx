// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
import React from "react";
import { useState, useRef, useEffect } from "react";
import "./timerStyle.css";
import { IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "@mui/material/styles";
// import notification from '../src/notifications'

const Timer = () => {
  const Ref = useRef<NodeJS.Timeout | null>(null);

  const [second, setSeconds] = useState(10);
  const [minute, setMinutes] = useState(0);
  const [hour, setHours] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  // calculate time remaining in the timer by subtracting the current date/time from the deadline time
  const getTimeRemaining = (e: string) => {
    const total = Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  //takes in a current deadline and sets the timer variable to display the time
  const setTime = (e: Date) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e.toString()); // update the timer
    if (total >= 0) {
      // check if less than 10 then we need to add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  //resets the timer with the previous deadline
  const onClickReset = () => {
    if (Ref.current) {
      clearInterval(Ref.current);
      setIsPaused(false);
    }
    setTime(getDeadTime());
  };

  //starts the timer
  const startTimer = (e: Date) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => setTime(e), 1000);
    Ref.current = id;
  };

  // resumes the timer by getting the time when it was stopped, subtracting from the previous deadline
  // creating a new deadline to start the timer again
  const onClickResume = () => {
    if (pausedTime != null && deadline != null) {
      const remainingTime = deadline.getTime() - pausedTime;
      const newDeadline = new Date(Date.now() + remainingTime);
      setDeadline(newDeadline);
      const s = Math.floor((remainingTime / 1000) % 60);

      setTime(newDeadline);
      startTimer(newDeadline);
      setIsPaused(false);
      setPausedTime(null);
    }
  };

  //sets the deadline for the timer (what the timer is counting down to)
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you specify how many minute, hours you want in your timer
    deadline.setSeconds(deadline.getSeconds() + second);
    deadline.setMinutes(deadline.getMinutes() + minute);
    deadline.setHours(deadline.getHours() + hour);
    setDeadline(deadline);

    return deadline;
  };

  //increase the timer by 5 minutes (5 seconds for testing purposes rn)
  const increaseTime = (e: Date) => {
    //increasing the set time by 5 seconds
    setMinutes(minute + 5);
    setTime(getDeadTime()); //reloading the timer display

    console.log(minute);
  };

  const onClickInc = () => {
    if (minute < 90 && !isPaused) {
      increaseTime(getDeadTime());
    }
  };

  //decrease the timer by 5 minutes (5 seconds for testing purposes rn)
  const decreaseTime = (e: Date) => {
    //increasing the set time by 5 seconds
    setMinutes(minute - 5);
    setTime(getDeadTime()); //reloading the timer display
  };

  const onClickDec = () => {
    if (minute > 0 && !isPaused) {
      decreaseTime(getDeadTime());
    }
  };

  //starts the timer
  const onClickStart = () => {
    startTimer(getDeadTime());
  };

  const onClickPause = () => {
    if (Ref.current) {
      clearInterval(Ref.current);
      setPausedTime(Date.now());
      setIsPaused(true);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="timeLeft">{timer}</h2>
      <div className="arrowContainer">
        <IconButton
          style={{
            margin: "0px",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={onClickInc}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton
          style={{
            margin: "0px",
            fontSize: "10px",
            color: "black",
            backgroundColor: "transparent",
          }}
          onClick={onClickDec}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </div>

      <div>
        {!isPaused ? (
          <button onClick={onClickStart}>Start</button>
        ) : (
          <button onClick={onClickResume}>Resume</button>
        )}
        <button className="reset" onClick={onClickReset}>
          Reset
        </button>
        {!isPaused && (
          <button className="pause" onClick={onClickPause}>
            Pause
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;

// pause: need to store time remaining whe the user pauses. To restart need to set a new deadline time with the time left
