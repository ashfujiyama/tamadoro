// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
import React from 'react';
import { useState , useRef, useEffect} from 'react';
import "./timerStyle.css";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';


 
const Timer = () => {
    const Ref = useRef<NodeJS.Timeout | null>(null);

    const [second, setSeconds] = useState(10);
    const [hour, setMinutes] = useState(0);
    const [minute, setHours] = useState(0);
 
    // The state for our timer
    const [timer, setTimer] = useState("00:00:00");
 
    // calculate time remaining in the timer by subtracting the current date/time from the deadline time
    const getTimeRemaining = (e: string) => {
        const total =
            Date.parse(e) - Date.parse(new Date().toString());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        const hours = Math.floor(
            (total / 1000 / 60 / 60) % 24
        );
        return {
            total,
            hours,
            minutes,
            seconds,
        };
    };
    
 
    //takes in a current deadline and sets the timer variable to display the time
    const setTime = (e: Date) => {
        let { total, hours, minutes, seconds } =
            getTimeRemaining(e.toString()); // update the timer
        if (total >= 0) {
            // check if less than 10 then we need to add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" + (minutes > 9 ? minutes: "0" + minutes) +
                ":" +( seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    //resets the timer with the previous deadline
    const onClickReset = () => {
        setTime(getDeadTime())
    }

    //starts the timer
    const startTimer = (e: Date) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => setTime(e), 1000);
        Ref.current = id;
    };
 
    //sets the deadline for the timer (what the timer is counting down to)
    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you specify how many minute, hours you want in your timer
        deadline.setSeconds(deadline.getSeconds() + second);
        deadline.setMinutes(deadline.getMinutes() + minute);
        return deadline;
    };

    //increase the timer by 5 minutes (5 seconds for testing purposes rn)
    const increaseTime = (e: Date) => {
        //increasing the set time by 5 seconds  
        setSeconds(second + 5); 
        setTime(getDeadTime()) //reloading the timer display
    };


    const onClickInc = () => {
        increaseTime(getDeadTime())
    };

    //decrease the timer by 5 minutes (5 seconds for testing purposes rn)
    const decreaseTime = (e: Date) => {
        //increasing the set time by 5 seconds  
        setSeconds(second - 5); 
        setTime(getDeadTime()) //reloading the timer display
    };

    const onClickDec = () => {
        decreaseTime(getDeadTime())
    };

    //starts the timer
    const onClickStart = () => {
        startTimer(getDeadTime());
    };
 
    return (
        <div style={{ textAlign: "center", margin: "auto" }}>
            <h2>{timer}</h2>
            <button onClick={onClickStart}>Start</button>
            <button className="reset" onClick={onClickReset}>Reset</button>
            <button className="up" onClick={onClickInc}>inc</button>
            <button className="down" onClick={onClickDec}>dec</button>
            {/* <button className='VoteButton' onClick={onClickStart}><ArrowUpward /> </button>
            <button className='VoteButton'onClick={onClickStart}><ArrowDownward /></button> */}
        </div>
    );
};

export default Timer


// pause: need to store time remaining whe the user pauses. To restart need to set a new deadline time with the time left 