import React from "react";
import Timer from "../timer/timer";
import Inventory from "../pet/inventory";
import LevelBar from "../pet/levelBar";
import PetDisplay from "../pet/petDisplay";
import { useState, useRef, useEffect } from "react";
import "./tamadoro.css";

const Tamadoro: React.FC = () => {
  // the initial deadline and duration of timer to pass to the Timer component 
  // InitPaused is the time when the user hit the paused button
  // need to store all of this in chrome storage so we can reload the timer ws this data when reopening the sidebar
  // right these variables are at a defualt but we will need to call chrome storage to set them 
  const [initDeadline, setInitDeadline] = useState<Date | null>(null);
  const [initDuration, setDuration] = useState(0);
  const [initPaused, setInitPaused] = useState<number | null>(null);

  useEffect(() => {
    // setInitDeadline(new Date(Date.now() + 25 * 60 * 1000)); // Setting initial deadline 25 minutes from now
    setInitDeadline(new Date(Date.now() + 10));
    setDuration(10);
  }, []); // Need this to run once on component mount

  return (
    <div className="screen">
      <div>
        <PetDisplay src="https://s9.gifyu.com/images/SZoHU.gif" alt="TamaPet" />
        {initDeadline != null && (
           <Timer initialDeadline={initDeadline} duration={initDuration} paused={null} /> 
        )}
        <LevelBar />
      </div>
    </div>
  );
};

export default Tamadoro;
