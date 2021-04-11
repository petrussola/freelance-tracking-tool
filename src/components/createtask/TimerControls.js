import React, { useContext } from "react";
import axios from "axios";

// context
import TimerContext from "../../context/context";

// env variables
import { envVariables } from "../../../config/env";

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
    setTaskNumber,
    setErrorMessage,
  } = useContext(TimerContext);

  const handleStartPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
      const startTime = Date.now();

      // call server to create task with start time and get id back
      console.log("starting job");
      axios
        .post(`${envVariables.endpointBase}create-task`, {
          name: "test",
          startTime: startTime,
        })
        .then((res) => {
          // get id back and set local state
          const { id } = res.data.data;
          setTaskNumber(id);
          localStorage.setItem("task", JSON.stringify({ startTime, id }));
        })
        .catch((err) => {
          const { message } = err.response.data.data;
          if (message) {
            setErrorMessage(message);
          } else {
            setErrorMessage("There was an error. Pleas try again later.");
          }
        });
    }
    if (!isOn) {
      setIsOn(true);
      intervalRef.current = setInterval(() => {
        setTimeElapsed((timeElapsed) => {
          return timeElapsed + 1;
        });
      }, 1000);
      // call db and start new session with job id from state
      console.log("starting session");
    } else {
      setIsOn(false);
      if (intervalRef.current === null) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // call db and set end session with job id from state
      console.log("stopping session");
    }
  };

  const handleStop = () => {
    setHasFinished(true);
    // call db to set job as finished
    console.log("stopping job");
    if (isOn) {
      setIsOn(false);
      if (intervalRef.current === null) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      // call db and set end session with job id from state
      console.log("stopping session");
    }
  };

  const resetTask = () => {
    setHasStarted(false);
    setIsOn(false);
    setHasFinished(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeElapsed(0);
    setTaskNumber((taskNumber) => {
      return taskNumber + 1;
    });
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
      {hasFinished ? <button onClick={resetTask}>Start New Task</button> : null}
    </div>
  );
}
