import React, { useContext, useEffect } from "react";
import axios from "axios";

// context
import TimerContext from "../../context/context";

// env variables
import { envVariables } from "../../../config/env";

// helpers
import { handleErrorMessage } from "../../helpers/helpers";

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
    startTime,
    setStartTime,
    stopTime,
    setStopTime,
    diffTime,
    setDiffTime,
    setTaskStatus,
  } = useContext(TimerContext);

  const handleStartPause = () => {
    if (!hasStarted && !isOn) {
      // start task and set as on
      setTaskStatus("recording time");
      const tempStartTime = Date.now();
      setStartTime(tempStartTime);
    } else if (hasStarted && isOn) {
      // pause task / set !isOn
      const tempPauseTime = Date.now();
      setStopTime(tempPauseTime);
    } else if (hasStarted && !isOn) {
      // restart task and set isOn
      const tempStartTime = Date.now();
      setStartTime(tempStartTime);
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

  useEffect(() => {
    if (!hasStarted && !isOn && startTime > 0) {
      setHasStarted(true);
      setIsOn(true);
      axios
        .post(`${envVariables.endpointBase}create-task`, {
          name: "test",
          startTime,
        })
        .then((res) => {
          // get id back and set local state
          const { id } = res.data.data;
          setTaskNumber(id);
          localStorage.setItem("task", JSON.stringify({ startTime, id }));
          intervalRef.current = setInterval(() => {
            setTimeElapsed((timeElapsed) => {
              return timeElapsed + 1;
            });
          }, 1000);
        })
        .catch((err) => {
          const { message } = err.response.data.data;
          if (message) {
            setErrorMessage(message);
          } else {
            setErrorMessage("There was an error. Pleas try again later.");
          }
        });
    } else if (hasStarted && !isOn) {
      // restart timer path
      setIsOn(true);
      intervalRef.current = setInterval(() => {
        setTimeElapsed((timeElapsed) => {
          return timeElapsed + 1;
        });
      }, 1000);
    }
  }, [startTime]);

  useEffect(() => {
    setIsOn(false);
    const diffTime = stopTime - startTime;
    setDiffTime(diffTime);
    if (stopTime > 0 && startTime > 0) {
      const { id } = JSON.parse(localStorage.getItem("task"));
      // call db and set length of task
      axios
        .put(`${envVariables.endpointBase}pause-task`, { id, diffTime })
        .then(() => {})
        .catch((err) => {
          const { message } = err.response.data.data;
          handleErrorMessage(message, setErrorMessage);
        })
        .finally(() => {
          setTaskStatus("paused");
          if (intervalRef.current === null) return;
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        });
    }
  }, [stopTime]);

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
