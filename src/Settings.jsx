import ReactSlider from "react-slider";
import "./slider.css";

// import Slider from "rc-slider";
import { useContext } from "react";
import SettingContext from "./SettingsContext";
import BackButton from "./BackButton";
export default function Settings() {
  const {
    showSetting,
    setShowSetting,
    workMinutes,
    breakMinutes,
    setWorkMinutes,
    setBreakMinutes,
  } = useContext(SettingContext);

  return (
    <div style={{ textAlign: "left" }}>
      <label>Work : {workMinutes}:00</label>

      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={workMinutes}
        onChange={(newValue) => setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break : {breakMinutes}:00</label>
      <ReactSlider
        className="slider green"
        thumbClassName="thumb"
        trackClassName="track"
        value={breakMinutes}
        onChange={(newValue) => setBreakMinutes(newValue)}
        min={1}
        max={30}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => setShowSetting(false)} />
      </div>
    </div>
  );
}
