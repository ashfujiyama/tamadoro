// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
import React from "react";
import { useState, useRef, useEffect } from "react";
import "./timerStyle.css";
import { IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "@mui/material/styles";
import { RuleFolderSharp } from "@mui/icons-material";
import * as timerUtils from "./timerUtils"
import Switch from "./modes"
// import notification from '../src/notifications'

interface TimerProps {
    initialDeadline: Date | null;
    initDuration: number | 0;
    paused: Date | null;
    initMode: string | null;
  }
  
const Timer: React.FC<TimerProps> = ({ initialDeadline, initDuration, paused, initMode}) => {
  const Ref = useRef<NodeJS.Timeout | null>(null);

  // actual state of the timer
  const [pausedTime, setPausedTime] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(initialDeadline);
  const [duration, setDuration] = useState(initDuration);
  const [currMode, setCurrMode] = useState<string | null>(initMode);
  const [focusCounter, setFocusCounter] = useState(0);

  //  // check val of currMode
  //  useEffect(() => {
  //   chrome.storage.sync.get("currMode", (result) => {
  //       const storedCurrMode = result.currMode;
  //       if (storedCurrMode === null) {
  //           chrome.storage.sync.set({"pausedTime": null}, () => {
  //               console.log("made new mode tracker 6");
  //           });
  //       } else {
  //         setCurrMode(storedCurrMode);
  //         console.log('in set mode', storedCurrMode);
  //       }
  //       });
  //   }, [])


  // The state for our timer
  const [timerDisplay, setTimerDisplay] = useState("00:00:00");

   // initialize pausedTime with chrome storage and update when pausedTime changes
   useEffect(() => {
    chrome.storage.sync.get("pausedTime", (result) => {
        const storedPausedTime = result.pausedTime;
        if (storedPausedTime === null) {
          chrome.storage.sync.set({"pausedTime": null}, () => {
              // console.log("made new pausedTime tracker");
          });
        } else {
            setPausedTime(storedPausedTime); //????????????
            // console.log('in set pausedTime', storedPausedTime);
        }
        });
    }, [])

    useEffect(() => {
      chrome.storage.sync.set({ "pausedTime": pausedTime }, () => {
            // console.log('Paused at time saved:', pausedTime);
            // console.log('paused time changes, deadline:', deadline);
        });
    }, [pausedTime]);


    // initialize deadline with chrome storage and update when deadline changes
    useEffect(() => {
        chrome.storage.sync.get("deadline", (result) => {
            if (!result.deadline) { //is this right with json, yes it is.
              let deadjson = initialDeadline?.toJSON();
              chrome.storage.sync.set({"deadline": deadjson}, () => {
                  console.log("made new deadline tracker");
              });
            } else {
              //alr a json, no need ot convert to json
                setDeadline(result.deadline);
                // chrome.storage.sync.set({ "deadline": deadline }, () => {
                //     console.log('deadline not null, deadline saved:', deadline);
                // });
            }
            });
        }, [])

    useEffect(() => {
      if (deadline != null) {
        let deadjson = deadline.toJSON();
        chrome.storage.sync.set({ "deadline": deadjson }, () => {
            console.log('deadline at time saved when resume:', new Date(deadjson));
        });
        // chrome.storage.sync.get(null, function (Items) {console.log(Items)});
      } else {
        chrome.storage.sync.set({ "deadline": null }, () => {});
      } 
    }, [deadline]);

     // initialize DURATION with chrome storage and update when changes
     useEffect(() => {
        chrome.storage.sync.get("duration", (result) => {
            if (!result.duration) {
                chrome.storage.sync.set({"duration": initDuration}, () => {
                    // console.log("made new duration tracker");
                });
                onClickReset();
            } else {
                setDuration(result.duration);
                chrome.storage.sync.set({ "duration": result.duration }, () => {
                    // console.log('Duration saved:', result.duration);
                });
                onClickReset();
            }
            });
        }, [])

        useEffect(() => {
            chrome.storage.sync.set({ "duration": duration }, () => {
                // console.log('duration at time saved:', duration);
                onClickReset();
            });
        }, [duration]);


    //sets the deadline for the timer (what the timer is counting down to)
   const getDeadTime = () => {
    let tempDeadline = new Date();

    // This is where you specify how many minutes you want in your timer
    tempDeadline.setMinutes(tempDeadline.getMinutes() + duration);
    setDeadline(tempDeadline);

    return tempDeadline;
  };


  // additional accessors
  const isPaused = () => {
    return pausedTime != null;
  }

  // calculate time remaining in the timer by subtracting the current date/time from the deadline time
  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
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
  const setTimerDisplayFromDate = (e: Date) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e); // update the timer
    if (total >= 0) {
      // check if less than 10 then we need to add '0' at the beginning of the variable
      setTimerDisplay(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const updateTimerDisplay = () => {
    if (deadline != null) setTimerDisplayFromDate(getDeadTime());
   }

  //resets the timer with the previous deadline
  const onClickReset = () => {
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    updateTimerDisplay();
    setPausedTime(null);
  };

  //starts the timer
  const startTimer = (e: Date) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => setTimerDisplayFromDate(e), 1000);
    Ref.current = id;
  };

  // resumes the timer by getting the time when it was stopped, subtracting from the previous deadline
  // creating a new deadline to start the timer again
  const onClickResume = () => {
    if (pausedTime != null && deadline != null) {
      const remainingTime = deadline.getTime() - new Date(pausedTime).getTime();
      const newDeadline = new Date(Date.now() + remainingTime);
      setDeadline(newDeadline);
      const s = Math.floor((remainingTime / 1000));

      setTimerDisplayFromDate(newDeadline);
      startTimer(newDeadline);
      setPausedTime(null);
    }
  };

  const increaseTimeGeneral = (d: Date, hoursDelta: number, minutesDelta: number, secondsDelta: number) => {
    let newDate = new Date();
    newDate.setSeconds(d.getSeconds() + secondsDelta);
    newDate.setMinutes(d.getMinutes() + minutesDelta);
    newDate.setHours(d.getHours() + hoursDelta);
    // console.log(duration)
    return newDate;
  }

  const increaseDeadline = (hoursDelta: number, minutesDelta: number, secondsDelta: number) => {
    if (deadline != null) setDeadline(increaseTimeGeneral(deadline, hoursDelta, minutesDelta, secondsDelta));
  }

  //increase the timer by 5 minutes (5 seconds for testing purposes rn)
  const increaseTime = (e: Date) => {
    //increasing the set time by 5 seconds
    setDuration(duration + 5);
    // console.log('inc', duration)
    // increaseDeadline(0, 5, 0);
    updateTimerDisplay(); //reloading the timer display
  };

  //decrease the timer by 5 minutes (5 seconds for testing purposes rn)
  const decreaseTime = (e: Date) => {
    //increasing the set time by 5 seconds
    // increaseDeadline(0, -5, 0);
    setDuration(duration - 5);
    // console.log(duration);
    updateTimerDisplay(); //reloading the timer display
  };

  const onClickInc = () => {
    if (deadline != null && (deadline.getHours() - (new Date).getHours() ) < 2 && !isPaused()) {
      increaseTime(deadline);
      updateTimerDisplay(); //reloading the timer display
    }
  };

  const onClickDec = () => {
    if (deadline != null && deadline != new Date && !isPaused()) {
      decreaseTime(deadline);
      updateTimerDisplay(); //reloading the timer display
    }
  };

  // display current deadline time when open chrome
  useEffect(() => {
    if (initialDeadline != null && pausedTime == null){
        updateTimerDisplay();
    } else {
        if(deadline != null){
            setTimerDisplayFromDate(deadline)
        }
    }
  }, []); // Need this to run once on component mount


  // if application was paused when closed, automatically starts countdown when deploy
  useEffect(() => {
    if (pausedTime != null){
       onClickResume();
      //  console.log("here")
    } 
  }, []); 

  //starts the timer
  const onClickStart = () => {
    startTimer(getDeadTime());
  };

  const onClickPause = () => {
    if (Ref.current) {
      clearInterval(Ref.current);
      setPausedTime(new Date(Date.now()).toString());
    }
  };

    // updae timer based on mode
    useEffect(() => {
    

    //Add event listener for changes in Chrome storage
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes["currMode"]) {
        chrome.storage.sync.get("currMode", (result) => {
            const storedMode = result.currMode;
            if (storedMode) {
                if (storedMode == "Break") {
                    setDuration(5);
                    setDeadline(new Date(Date.now() + duration));
                    updateTimerDisplay();
                  } else {
                    setDuration(10);
                    setDeadline(new Date(Date.now() + duration));
                    updateTimerDisplay();
                  }
            }
          });
      }
    });

    // Clean up event listener when component unmounts
    return () => {
      chrome.storage.onChanged.removeListener((changes, namespace) => {
        if (changes["currMode"]) {
            chrome.storage.sync.get("currMode", (result) => {
                const storedMode = result.currMode;
                if (storedMode) {
                    if (storedMode == "Break") {
                        setDuration(5);
                        setDeadline(new Date(Date.now() + initDuration));
                        updateTimerDisplay();
                      } else {
                        setDuration(10);
                        setDeadline(new Date(Date.now() + initDuration));
                        updateTimerDisplay();
                      }
                }
              });
        }
      });
    };
  }, []);


  // change mode 
  const updateMode = () => {
    // setCurrMode((prevMode) => prevMode === "Focus" ? "Break" : "Focus");
    //       console.log("changed mode");
    if (currMode == "Break" || currMode == "Long Break") { // we want to change to focus mode
      setDuration(25);
      setFocusCounter(focusCounter + 1)
      setCurrMode("Focus")
    } else if (currMode == "Focus" && focusCounter == 3) { // we want to change to long break
      setDuration(10); 
      setCurrMode("Long Break")
      setFocusCounter(0)
    } else { // we want to change to break
      setDuration(5); 
      setCurrMode("Break")
    }
    onClickReset();
  }


  return (
    <div style={{ textAlign: "center" }}>
      <div className="timerContainer">
        <div className="timerDisplay">
          <h2 className="timeLeft">{timerDisplay}</h2>
        </div>
        <div className="arrowContainer">
          <IconButton
            style={{
              padding: "0", // Set padding to 0
              margin: "0",
              color: "black",
              backgroundColor: "transparent",
            }}
            onClick={onClickInc}
          >
            <ArrowDropUpIcon />
          </IconButton>
          <IconButton
            style={{
              padding: "0", // Set padding to 0
              margin: "0",
              fontSize: "10px",
              color: "black",
              backgroundColor: "transparent",
            }}
            onClick={onClickDec}
          >
            <ArrowDropDownIcon />
          </IconButton>
        </div>
      </div>




      <div>
        {!isPaused() ? (
          <button onClick={onClickStart}>Start</button>
        ) : (
          <button onClick={onClickResume}>Resume</button>
        )}
        <button className="reset" onClick={onClickReset}>
          Reset
        </button>
        {!isPaused() && (
          <button className="pause" onClick={onClickPause}>
            Pause
          </button>
        )}
      </div>
      <h2 className="mode">{currMode}</h2>
      <button className="Update_Mode" onClick={updateMode}>
          Update Mode
      </button>

    </div>
  );
};

export default Timer;


// *********** when the timer closes set paused time to reactivate when reopen

// pause: need to store time remaining whe the user pauses. To restart need to set a new deadline time with the time left


// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
// timer countdown with timer controller buttoms (start, stop, restart, skip)
// keep track of time elapsed and add to progress if complete
// import React from "react";
// import { useState, useRef, useEffect } from "react";
// import "./timerStyle.css";
// import { IconButton } from "@mui/material";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import "@mui/material/styles";
// import { RuleFolderSharp } from "@mui/icons-material";
// // import notification from '../src/notifications'

// interface TimerProps {
//     initialDeadline: Date | null;
//     duration: number | 0;
//     paused: Date | null;
//   }
  
// // get propositions passed in from tomodoro to keep track of what to set the timer to. InitDeadline is the dealdine it is counting down to 
// // duraiton is how long we are setting the timer to (its 10 seconds right now)
// const Timer: React.FC<TimerProps> = ({ initialDeadline, duration }) => {
//   const Ref = useRef<NodeJS.Timeout | null>(null);

//   const [second, setSeconds] = useState(10);
//   const [minute, setMinutes] = useState(0);
//   const [hour, setHours] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [pausedTime, setPausedTime] = useState<number | null>(null);
//   const [deadline, setDeadline] = useState<Date | null>(null);

//   // The state for our timer
//   const [timer, setTimer] = useState("00:00:00");

//   // calculate time remaining in the timer by subtracting the current date/time from the deadline time
//   const getTimeRemaining = (e: string) => {
//     const total = Date.parse(e) - Date.parse(new Date().toString());
//     const seconds = Math.floor((total / 1000) % 60);
//     const minutes = Math.floor((total / 1000 / 60) % 60);
//     const hours = Math.floor((total / 1000 / 60 / 60) % 24);
//     return {
//       total,
//       hours,
//       minutes,
//       seconds,
//     };
//   };

//   //takes in a current deadline and sets the timer variable to display the time
//   const setTime = (e: Date) => {
//     let { total, hours, minutes, seconds } = getTimeRemaining(e.toString()); // update the timer
//     if (total >= 0) {
//       // check if less than 10 then we need to add '0' at the beginning of the variable
//       setTimer(
//         (hours > 9 ? hours : "0" + hours) +
//           ":" +
//           (minutes > 9 ? minutes : "0" + minutes) +
//           ":" +
//           (seconds > 9 ? seconds : "0" + seconds)
//       );
//     }
//   };

//   //resets the timer with the previous deadline
//   const onClickReset = () => {
//     if (Ref.current) {
//       clearInterval(Ref.current);
//     }
//     setTime(getDeadTime());
//   };

//   //starts the timer
//   const startTimer = (e: Date) => {
//     if (Ref.current) clearInterval(Ref.current);
//     const id = setInterval(() => setTime(e), 1000);
//     Ref.current = id;
//   };

//   // resumes the timer by getting the time when it was stopped, subtracting from the previous deadline
//   // creating a new deadline to start the timer again
//   const onClickResume = () => {
//     if (pausedTime != null && deadline != null) {
//       const remainingTime = deadline.getTime() - pausedTime;
//       const newDeadline = new Date(Date.now() + remainingTime);
//       setDeadline(newDeadline);
//       const s = Math.floor((remainingTime / 1000) % 60);

//       setTime(newDeadline);
//       startTimer(newDeadline);
//       setIsPaused(false);
//       setPausedTime(null);
//     }
//   };

//   //sets the deadline for the timer (what the timer is counting down to)
//   const getDeadTime = () => {
//     let deadline = new Date();

//     // This is where you specify how many minute, hours you want in your timer
//     deadline.setSeconds(deadline.getSeconds() + duration);
//     // deadline.setMinutes(deadline.getMinutes() + minute);
//     // deadline.setHours(deadline.getHours() + hour);
//     setDeadline(deadline);

//     return deadline;
//   };

//   //increase the timer by 5 minutes (5 seconds for testing purposes rn)
//   const increaseTime = (e: Date) => {
//     //increasing the set time by 5 seconds
//     setMinutes(minute + 5);
//     setTime(getDeadTime()); //reloading the timer display

//     console.log(minute);
//   };

//   //decrease the timer by 5 minutes (5 seconds for testing purposes rn)
//   const decreaseTime = (e: Date) => {
//     //increasing the set time by 5 seconds
//     setMinutes(minute - 5);
//   };

//   const onClickInc = () => {
//     if (minute < 90 && !isPaused) {
//       increaseTime(getDeadTime());
//     }
//   };

//   const onClickDec = () => {
//     if (minute > 0 && !isPaused) {
//       decreaseTime(getDeadTime());
//     }
//     setTime(getDeadTime()); //reloading the timer display
//   };

//   //starts the timer
//   const onClickStart = () => {
//     startTimer(getDeadTime());
//   };

//   const onClickPause = () => {
//     if (Ref.current) {
//       clearInterval(Ref.current);
//       setPausedTime(Date.now());
//       setIsPaused(true);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h2 className="timeLeft">{timer}</h2>
//       <div className="arrowContainer">
//         <IconButton
//           style={{
//             margin: "0px",
//             color: "black",
//             backgroundColor: "transparent",
//           }}
//           onClick={onClickInc}
//         >
//           <ArrowDropUpIcon />
//         </IconButton>
//         <IconButton
//           style={{
//             margin: "0px",
//             fontSize: "10px",
//             color: "black",
//             backgroundColor: "transparent",
//           }}
//           onClick={onClickDec}
//         >
//           <ArrowDropDownIcon />
//         </IconButton>
//       </div>

//       <div>
//         {!isPaused ? (
//           <button onClick={onClickStart}>Start</button>
//         ) : (
//           <button onClick={onClickResume}>Resume</button>
//         )}
//         <button className="reset" onClick={onClickReset}>
//           Reset
//         </button>
//         {!isPaused && (
//           <button className="pause" onClick={onClickPause}>
//             Pause
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Timer;

// // pause: need to store time remaining whe the user pauses. To restart need to set a new deadline time with the time left