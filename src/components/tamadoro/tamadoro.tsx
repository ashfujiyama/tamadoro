import ModeDisplay from "../timer/modeDisplay";
import HealthDisplay from "../pet/healthDisplay";
import React, { useState, useEffect } from "react";
import Timer from "../timer/timer";
import Inventory from "../pet/inventory";
import LevelBar from "../pet/levelBar";
import PetDisplay from "../pet/petDisplay";
import "./tamadoro.css";
import { Task } from "../types";

const Tamadoro: React.FC = () => {
  const [initDeadline, setInitDeadline] = useState<Date | null>(null);
  const [initDuration, setDuration] = useState(0);
  const [currMode, setCurrMode] = useState<string | null>(null);

  const [health, setHealth] = useState(100);
  const [xp, setXP] = useState(0);

  // initialize CURR MODE with chrome storage and update when it changes
  useEffect(() => {
    chrome.storage.sync.get("currMode", (result) => {
      const storedCurrMode = result.currMode;
      if (storedCurrMode === null) {
        chrome.storage.sync.set({ currMode: null }, () => {
          console.log("made new currMode tracker");
        });
      } else {
        setCurrMode(storedCurrMode);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ currMode: currMode }, () => {
      console.log("currMode at time saved:", currMode);
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
          setCurrMode((prevMode) => (prevMode === "Focus" ? "Break" : "Focus"));
          console.log("changed mode");
        }
      }
    });
  }, []);

  useEffect(() => {
    setDuration(25);
    setInitDeadline(new Date(Date.now() + initDuration));
    setCurrMode("Focus");
    chrome.storage.sync.set({ health: health }, () => {
      console.log("health created");
    });
  }, []);

    // at midnight, decrease hp/xp if tasks are incomplete
    useEffect(() => {
      const checkStorageAtMidnight = () => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          getDeficit();
          }
        };
  
      //Run the function every minute to check for midnight
      // const intervalId = setInterval(checkStorageAtMidnight, 3600000);
      const intervalId = setInterval(checkStorageAtMidnight, 10000);
      // const intervalId = setInterval(checkStorageAtMidnight, 300000);
  
      // Clean up interval when component unmounts
      return () => clearInterval(intervalId);
    }, []);

  // calculate incomplete productivity minutes
  const getDeficit = () => {
    chrome.storage.sync.get(["taskList"], (result: { taskList?: Task[] }) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving health data:', chrome.runtime.lastError);
      } else {
        const taskList = result.taskList;
        if (taskList) {
          console.log("deficit")
           // Calculate the sum of all (dailyGoal - dailyProgress)
          const totalDeficit = taskList.reduce((acc, task) => {
            const deficit = task.dailyGoal - task.dailyProgress;
            return acc + (deficit > 0 ? deficit : 0);
          }, 0);
          console.log("the total deficit is ", totalDeficit)
          if (totalDeficit > 0) {
            const overflow = decreaseHealth(totalDeficit)
            decreaseXP(overflow);
          }
          console.log("Total Health Deficit:", totalDeficit);
          }
      }
    });
  };

  // decrement health
  const decreaseHealth = (deficit: number): number => {
    console.log("dec hp")
    chrome.storage.sync.get("health", (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving health data:', chrome.runtime.lastError);
      } else {
        const newHealth = Math.max(result.health - deficit, 0);
        const overflow = result.health - deficit - newHealth;
        console.log("new health is ", newHealth)
        chrome.storage.sync.set({ health: newHealth }, () => {
          setHealth(newHealth);
          console.log(`Health updated to ${health}`);
        });

        return overflow; // return the deficit overflow
    }});
    return 0;
  };

  // decrease xp from health decrement overflow
  const decreaseXP = (deficit: number): void => {
    console.log("dec xp")
    chrome.storage.sync.get("xp", (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving xp data:', chrome.runtime.lastError);
      } else {
        if (result.xp) {
        const newXP = Math.max(result.xp - deficit, 0);

        chrome.storage.sync.set({ xp: newXP }, () => {
          setXP(newXP);
          console.log(`XP updated to ${xp}`);
        });
        }
      }
    });
  };

  // updates XP when it is changed in chrome storage
  useEffect(() => {
    const handleXPChange = (changes: { [x: string]: any; }, namespace: any) => {
      if (changes["xp"]) {
        chrome.storage.sync.get("xp", (result) => {
          const storedXP = result.xp;
          if (storedXP) {
            setXP(storedXP);
            console.log("Updated XP:", storedXP);
          }
        });
      }
    };
  
    // Add event listener for changes in XP Chrome storage
    chrome.storage.onChanged.addListener(handleXPChange);
  
    // Clean up event listener when component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(handleXPChange);
    };
  }, []);
  
  useEffect(() => {
    const handleHPChange = (changes: { [x: string]: any; }, namespace: any) => {
      if (changes["health"]) {
        chrome.storage.sync.get("health", (result) => {
          const storedHP = result.health;
          if (storedHP) {
            setHealth(storedHP);
            console.log("Updated HP:", storedHP);
          }
        });
      }
    };
  
    // Add event listener for changes in XP Chrome storage
    chrome.storage.onChanged.addListener(handleHPChange);
  
    // Clean up event listener when component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(handleHPChange);
    };
  }, []);

  return (
    <div className="screen">
      <div>
        <Inventory />
        <PetDisplay src="https://s9.gifyu.com/images/SZoHU.gif" alt="TamaPet" />
        {initDeadline && (
          <Timer
            initialDeadline={initDeadline}
            initDuration={initDuration}
            paused={null}
            initMode={currMode}
          />
        )}
        <HealthDisplay health={health} />
        <LevelBar fullXP={xp} />
        <button onClick={() => setXP(xp + 10)}>Increment XP</button>
      </div>
    </div>
  );
};

export default Tamadoro;