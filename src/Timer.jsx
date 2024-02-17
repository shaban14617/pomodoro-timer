import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useEffect, useRef, useState } from "react";
import SettingContext from "./SettingsContext";

export default function Timer() {
  const red = "#f54e4e";
  const green = "#4aec8c";
  const { ShowSetting, setShowSetting, workMinutes, breakMinutes } =
    useContext(SettingContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const secondLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function handlePlayButton() {
    setIsPaused(false);
    isPausedRef.current = false;
  }
  function handlePauseButton() {
    setIsPaused(true);
    isPausedRef.current = true;
  }

  function initalTimer() {
    setSecondsLeft(workMinutes * 60);
  }

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds = (nextMode === "work" ? workMinutes : breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondLeftRef.current = nextSeconds;
  }
  function tick() {
    secondLeftRef.current--;
    setSecondsLeft(secondLeftRef.current);
  }

  useEffect(() => {
    initalTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [ShowSetting, setShowSetting]);

  const totlaSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totlaSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255, 255, 255, 0.68)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton onClick={handlePlayButton} />
        ) : (
          <PauseButton onClick={handlePauseButton} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => setShowSetting(!ShowSetting)} />
      </div>
    </div>
  );
}
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import PlayButton from "./PlayButton";
// import PauseButton from "./PauseButton";
// import SettingsButton from "./SettingsButton";
// import SettingContext from "./SettingsContext";

// export default function Timer() {
//   // Define colors for the progress bar
//   const red = "#f54e4e";

//   // Access settings and control the timer using context
//   const { ShowSetting, setShowSetting, workMinutes, breakMinutes } =
//     useContext(SettingContext);

//   // State variables to manage timer behavior
//   const [isPaused, setIsPaused] = useState(false); // Indicates if the timer is paused
//   const [mode, setMode] = useState("work"); // Indicates the current mode (work or break)
//   const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60); // Remaining seconds on the timer

//   // Refs to maintain values across renders
//   const secondLeftRef = useRef(secondsLeft); // Holds the current value of secondsLeft
//   const isPausedRef = useRef(isPaused); // Holds the current value of isPaused
//   const modeRef = useRef(mode); // Holds the current value of mode

//   // Function to initialize the timer
//   function initializeTimer() {
//     setSecondsLeft(workMinutes * 60); // Reset the timer to the initial work duration
//   }

//   // Function to switch between work and break modes
//   function switchMode() {
//     const nextMode = modeRef.current === "work" ? "break" : "work"; // Toggle between work and break modes
//     const nextSeconds = (nextMode === "work" ? workMinutes : breakMinutes) * 60; // Set the duration for the next mode

//     setMode(nextMode); // Update the mode state
//     modeRef.current = nextMode; // Update the mode ref
//     setSecondsLeft(nextSeconds); // Update the remaining seconds
//     secondLeftRef.current = nextSeconds; // Update the seconds ref
//   }

//   // Function to decrement seconds and update the timer
//   function tick() {
//     if (!isPausedRef.current) {
//       // If the timer is not paused
//       secondLeftRef.current--; // Decrement the remaining seconds
//       setSecondsLeft(secondLeftRef.current); // Update the seconds state
//     }
//   }

//   // Effect hook to initialize the timer and start ticking
//   useEffect(() => {
//     initializeTimer(); // Initialize the timer when the component mounts
//     const interval = setInterval(tick, 1000); // Start ticking

//     return () => clearInterval(interval); // Clean up by clearing the interval when the component unmounts
//   }, [ShowSetting, setShowSetting]); // Depend on ShowSetting and setShowSetting

//   // Effect hook to sync isPaused state with isPausedRef
//   useEffect(() => {
//     isPausedRef.current = isPaused; // Update the isPaused ref when the isPaused state changes
//   }, [isPaused]); // Depend on isPaused state

//   // Calculate percentage for progress bar
//   const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60; // Total seconds based on current mode
//   const percentage = Math.round((secondsLeft / totalSeconds) * 100); // Calculate the percentage
//   const minutes = Math.floor(secondsLeft / 60); // Calculate the remaining minutes
//   const seconds = secondsLeft % 60; // Calculate the remaining seconds

//   // Render the timer component
//   return (
//     <div>
//       <CircularProgressbar
//         value={percentage} // Set the value for the progress bar
//         text={`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`} // Display the remaining time
//         styles={buildStyles({
//           textColor: "#fff",
//           pathColor: red,
//           trailColor: "rgba(255, 255, 255, 0.68)",
//         })}
//       />
//       <div style={{ marginTop: "20px" }}>
//         {/* Conditionally render play/pause button based on isPaused state */}
//         {isPaused ? (
//           <PlayButton onClick={() => setIsPaused(false)} /> // Render PlayButton if paused
//         ) : (
//           <PauseButton onClick={() => setIsPaused(true)} /> // Render PauseButton if not paused
//         )}
//       </div>
//       <div style={{ marginTop: "20px" }}>
//         {/* Render settings button */}
//         <SettingsButton onClick={() => setShowSetting(!ShowSetting)} />
//       </div>
//     </div>
//   );
// }
