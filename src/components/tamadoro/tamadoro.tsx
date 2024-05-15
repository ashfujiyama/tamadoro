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

  const [health, setHealth] = useState(50);
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

  // calculate incomplete productivity minutes
  const getDeficit = () => {
    chrome.storage.sync.get(["taskList"], (result: { taskList?: Task[] }) => {
      if (result.taskList && result.taskList.length > 0) {
        const taskList = result.taskList;

        // Calculate the sum of all (dailyGoal - dailyProgress)
        const totalDeficit = taskList.reduce((acc, task) => {
          const deficit = task.dailyGoal - task.dailyProgress;
          return acc + (deficit > 0 ? deficit : 0);
        }, 0);

        console.log("Total Health Deficit:", totalDeficit);
      }
    });
  };

  // decrement health
  const decreaseHealth = (deficit: number): number => {
    chrome.storage.sync.get("health", (result) => {
      if (result.health) {
        const newHealth = Math.max(result.health - deficit, 0);
        const overflow = result.health - deficit - newHealth;

        chrome.storage.sync.set({ health: newHealth }, () => {
          setHealth(newHealth);
          console.log(`Health updated to ${health}`);
        });

        return overflow; // Return the new health value
      } else {
        const newHealth = health - deficit;
        const overflow = health - deficit - newHealth;

        chrome.storage.sync.set({ health: newHealth }, () => {
          console.log(`Health initialized to ${newHealth}`);
        });

        return overflow;
      }
    });

    return 0;
  };

  // decrease xp from health decrement overflow
  const decreaseXP = (deficit: number): void => {
    chrome.storage.sync.get("xp", (result) => {
      if (result.xp) {
        const newXP = Math.max(result.xp - deficit, 0);

        chrome.storage.sync.set({ xp: newXP }, () => {
          setXP(newXP);
          console.log(`XP updated to ${xp}`);
        });
      } else {
        const newXP = Math.max(xp - deficit, 0);

        chrome.storage.sync.set({ xp: newXP }, () => {
          setXP(newXP);
          console.log(`Health initialized to ${xp}`);
        });
      }
    });
  };

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