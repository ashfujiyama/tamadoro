// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
import React from 'react';
import { useState , useRef, useEffect} from 'react';
import "./timerStyle.css";

const Timer = () => {
    const Ref = useRef(null);

    const [timer, setTimer] = useState("00:00");

    // const getTimeRemaining = (e) => {

    // }


    return (
        <div className='timerContainer'>
            <h2>{ timer }</h2>
            <h2> "hii"</h2>

        </div>
    )

};





export default Timer