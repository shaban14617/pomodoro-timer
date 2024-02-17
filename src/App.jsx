import Timer from "./Timer";
import "./App.css";
import Settings from "./Settings";
import { useState } from "react";
import SettingContext from "./SettingsContext";
function App() {
  const [showSetting, setShowSetting] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <main>
      <SettingContext.Provider
        value={{
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
          showSetting,
          setShowSetting,
        }}
      >
        {showSetting ? <Settings /> : <Timer />}
      </SettingContext.Provider>
    </main>
  );
}

export default App;
