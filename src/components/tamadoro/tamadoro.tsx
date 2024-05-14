// import React from "react";
// import Timer from "../timer/timer";
// import Inventory from "../pet/inventory";
// import LevelBar from "../pet/levelBar";
// import PetDisplay from "../pet/petDisplay";
// import { useState, useRef, useEffect } from "react";
// import "./tamadoro.css";

// const Tamadoro: React.FC = () => {
//   // the initial deadline and duration of timer to pass to the Timer component 
//   // InitPaused is the time when the user hit the paused button
//   // need to store all of this in chrome storage so we can reload the timer ws this data when reopening the sidebar
//   // right these variables are at a defualt but we will need to call chrome storage to set them 
//   const [initDeadline, setInitDeadline] = useState<Date | null>(null);
//   const [initDuration, setDuration] = useState(0);
//   const [initPaused, setInitPaused] = useState<number | null>(null);

//   // initialize modes
//   const [focusMode, setFocusMode] = useState<string | null>(null);
//   const [breakMode, setBreakMode] = useState<string | null>(null);
//   const [longBreakMode, setLongBreakMode] = useState<string | null>(null);
//   const [currMode, setCurrMode] = useState<string | null>(null);
  
//   // initialize FOCUS with chrome storage and update when changes
//   useEffect(() => {
//     chrome.storage.sync.get("currMode", (result) => {
//         if (!result.currMode) {
//             chrome.storage.sync.set({"currMode": null}, () => {
//                 console.log("made new currMode tracker");
//             });
//         } else {
//             setCurrMode(currMode);
//             chrome.storage.sync.set({ currMode: currMode }, () => {
//                 console.log('currMode saved:', currMode);
//             });
//         }
//         });
//     }, [])

//     useEffect(() => {
//         chrome.storage.sync.set({ currMode: currMode }, () => {
//             console.log('currMode at time saved:', currMode);
//         });
//     }, [currMode]);


//     // check state of each mode
//     const isFocus = () => {
//       return focusMode != null;
//     }

//     // check state of each mode
//     const isBreak = () => {
//       return breakMode != null;
//     }

//     // check state of each mode
//     const isLongBreak = () => {
//       return longBreakMode != null;
//     }

//     useEffect(() => {
//       console.log("inside change mode")
//       chrome.storage.sync.get("deadline", (result) => {
//           const storedDeadline = result.deadline;
//           if (storedDeadline) {
//               const deadlineTime = new Date(storedDeadline).getTime();
//               const currentTime = new Date().getTime();
//               if (currentTime >= deadlineTime) {
//                 if (currMode === "Focus") {
//                   setCurrMode("Break");
//                   console.log("break")
//                 } else {
//                   setCurrMode("Focus");
//                 }
//               }
//           }
//           console.log('cur', currMode)
//       });
//     }, []);

//   useEffect(() => {
//     // setInitDeadline(new Date(Date.now() + 25 * 60 * 1000)); // Setting initial deadline 25 minutes from now
//     setDuration(10);
//     setInitDeadline(new Date(Date.now() + initDuration));
//     setFocusMode("Focus")
//     setCurrMode("Focus")
//   }, []); // Need this to run once on component mount

//   // Displays the mode in Chrome
//   // Displays the task list stored in Chrome
//   // useEffect(() => {
//   //   updateMode(); // Load initial task list

//     // Add event listener for changes in Chrome storage
//   //   chrome.storage.onChanged.addListener((changes, namespace) => {
//   //     if (changes["pausedTime"]) {
//   //       updateMode(); // Update task list state when taskList changes
//   //     }
//   //   });

//   //   // Clean up event listener when component unmounts
//   //   return () => {
//   //     chrome.storage.onChanged.removeListener((changes, namespace) => {
//   //       if (changes["pausedTime"]) {
//   //         updateMode(); // Update task list state when taskList changes
//   //       }
//   //     });
//   //   };
//   // }, []);

//   return (
//     <div className="screen">
//       <div>
//         <PetDisplay src="https://s9.gifyu.com/images/SZoHU.gif" alt="TamaPet" />
//         {initDeadline != null && (
//            <Timer initialDeadline={initDeadline} initDuration={initDuration} paused={null} /> 
//         )}
//         <h2 className="mode">{currMode}</h2>
//         <Inventory />
//         <LevelBar />
//       </div>
//     </div>
//   );
// };

// export default Tamadoro;

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

  const updateMode = () => {
    setCurrMode((prevMode) => prevMode === "Focus" ? "Break" : "Focus");
          console.log("changed mode");
    if (currMode == "Break") {
      setDuration(5);
      setInitDeadline(new Date(Date.now() + initDuration));
    } else {
      setDuration(10);
      setInitDeadline(new Date(Date.now() + initDuration));
    }
  }

  


  useEffect(() => {
    setDuration(10);
    setInitDeadline(new Date(Date.now() + initDuration));
    setCurrMode("Focus");
  }, []);

  return (
    <div className="screen">
      <div>
        <PetDisplay src="https://s9.gifyu.com/images/SZoHU.gif" alt="TamaPet" />
        {initDeadline && (
          <Timer initialDeadline={initDeadline} initDuration={initDuration} paused={null} />
        )}
        <h2 className="mode">{currMode}</h2>
        <button className="Update_Mode" onClick={updateMode}>
          Update Mode
        </button>
        <Inventory />
        <LevelBar />
      </div>
    </div>
  );
};

export default Tamadoro;