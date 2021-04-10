import React, { useContext } from "react";

// context
import TimerContext from "../../context/context";

export default function TimerControls() {
  const {
    hasStarted,
    setHasStarted,
    isOn,
    setIsOn,
    hasFinished,
    setHasFinished,
    setTimeElapsed,
    intervalRef,
  } = useContext(TimerContext);

  const handleStartPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsOn(!isOn);
    if (isOn) {
      if (intervalRef.current === null) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((timeElapsed) => {
          return timeElapsed + 1;
        });
      }, 1000);
    }
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
