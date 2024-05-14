
import ModeDisplay from '../timer/modeDisplay';
import HealthDisplay from '../pet/healthDisplay';
import React, { useState, useEffect } from "react";
import Timer from "../timer/timer";
import Inventory from "../pet/inventory";
import LevelBar from "../pet/levelBar";
import PetDisplay from "../pet/petDisplay";
import "./tamadoro.css";

const Tamadoro: React.FC = () => {
  const [initDeadline, setInitDeadline] = useState<Date | null>(null);
  const [initDuration, setDuration] = useState(0);
  const [currMode, setCurrMode] = useState<string | null>(null);


  // initialize CURR MODE with chrome storage and update when it changes
  useEffect(() => {
    chrome.storage.sync.get("currMode", (result) => {
      const storedCurrMode = result.currMode;
      if (storedCurrMode === null) {
        chrome.storage.sync.set({ "currMode": null }, () => {
          console.log("made new currMode tracker");
        });
      } else {
        setCurrMode(storedCurrMode);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ currMode: currMode }, () => {
      console.log('currMode at time saved:', currMode);
    });
  }, [currMode]);

  // check if we passed the deadline, if so, change mode 
  useEffect(() => {
    chrome.storage.sync.get("deadline", (result) => {
      const storedDeadline = result.deadline;
      if (storedDeadline) {
        const deadlineTime = new Date(storedDeadline).getTime();
        const currentTime = new Date().getTime();
        if (currentTime >= deadlineTime) {
          setCurrMode((prevMode) => prevMode === "Focus" ? "Break" : "Focus");
          console.log("changed mode");
        }
      }
    });
  }, []);

  useEffect(() => {
    setDuration(25);
    setInitDeadline(new Date(Date.now() + initDuration));
    setCurrMode("Focus");
  }, []);

  return (
    <div className="screen">
      <div>
        <PetDisplay src="https://s9.gifyu.com/images/SZoHU.gif" alt="TamaPet" />
        {initDeadline && (
          <Timer initialDeadline={initDeadline} initDuration={initDuration} paused={null} initMode={currMode}/>
        )}
        <Inventory />
        <HealthDisplay health={100} />
        <LevelBar maxHp={100} hp={60} />
      </div>
    </div>
  );
};

export default Tamadoro;