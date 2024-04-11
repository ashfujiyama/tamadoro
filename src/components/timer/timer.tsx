// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
import React from 'react';
import { useState , useRef, useEffect} from 'react';
import "./timerStyle.css";

const Timer = () => {
    const Ref = useRef<NodeJS.Timeout | null>(null);

    const [timer, setTimer] = useState("00:25");

    const getTimeRemaining = (e: string) => {
        const total = Date.parse(e) - Date.parse(new Date().toString());
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total,
            hours,
            minutes
        };
    };

    const startTimer = (e: any) => {
        let {total, hours, minutes} = getTimeRemaining(timer);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) + ":" +
                (minutes > 9 ? minutes : "0" + minutes)
            );
        }

    };

    const clearTimer = (e: Date) => {
        setTimer("00:25");

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getMinutes() + 25);
        return deadline
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const onClickReset = () => {
        clearTimer(getDeadTime());
    };

    return (
        <div className='timerContainer'>
            <h2>{ timer }</h2>
            <button onClick={onClickReset}>Reset</button>
        </div>
    )
};

export default Timer