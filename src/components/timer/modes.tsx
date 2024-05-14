import React from "react";
import { useState, useRef, useEffect } from "react";
import "./timerStyle.css";
import { IconButton } from "@mui/material";
import "@mui/material/styles";


const [isFocused, setFocusMode]  = useState(true);
const [isBreak, setBreakMode]  = useState(false);
const [isLongBreak, setLongBreakMode]  = useState(false);

// store the current amount of pomodoros completed and focus/break modes


const [iterations, setIterations] = useState(1)

// useEffect to call every second , and setInterval

const Switch = ({getTimeRemaining}:any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining();
    
    return (<div></div>)

};

export default Switch;