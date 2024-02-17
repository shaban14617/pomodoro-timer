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
