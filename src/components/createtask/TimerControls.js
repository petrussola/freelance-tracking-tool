import React, { useState } from "react";

export default function TimerControls() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const handleStartPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsOn(!isOn);
  };

  const handleStop = () => {
    setHasFinished(true);
  };

  return (
    <div>
      <button onClick={handleStartPause} disabled={hasFinished ? true : false}>
        {isOn ? "Pause" : hasStarted ? "Restart" : "Start"}
      </button>
      {hasStarted ? (
        <button onClick={handleStop} disabled={hasFinished ? true : false}>
          Stop
        </button>
      ) : null}
    </div>
  );
}
