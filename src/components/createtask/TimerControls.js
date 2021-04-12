import React, { useContext, useEffect } from "react";
import axios from "axios";

// context
import TimerContext from "../../context/context";

// env variables
import { envVariables } from "../../../config/env";

// helpers
import { handleDisplayMessage } from "../../helpers/helpers";

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
    taskNumber,
    setTaskNumber,
    setErrorMessage,
    startTime,
    setStartTime,
    stopTime,
    setStopTime,
    setTaskStatus,
    nameTask,
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
    const tempPauseTime = Date.now();
    setHasFinished(true);
    setStopTime(tempPauseTime);
  };

  const resetTask = () => {
    setHasStarted(false);
    setIsOn(false);
    setHasFinished(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeElapsed(0);
    setTaskNumber(0);
    setStartTime(0);
    setStopTime(0);
    setTaskStatus("");
  };

  useEffect(() => {
    if (!hasStarted && !isOn && startTime > 0) {
      setHasStarted(true);
      setIsOn(true);
      axios
        .post(`${envVariables.endpointBase}create-task`, {
          name: nameTask,
          startTime,
        })
        .then((res) => {
          let id;
          // get id back and set local state
          if (res.data.data.id.jobId) {
            id = res.data.data.id.jobId;
          } else {
            id = res.data.data.id;
          }
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
    if (stopTime > 0 && startTime > 0 && !hasFinished) {
      // const { id } = JSON.parse(localStorage.getItem("task"));
      // call db and set length of task
      axios
        .put(`${envVariables.endpointBase}pause-task`, {
          id: taskNumber,
          diffTime,
        })
        .then(() => {})
        .catch((err) => {
          const { message } = err.response.data.data;
          handleDisplayMessage(message, setErrorMessage);
        })
        .finally(() => {
          setTaskStatus("paused");
          if (intervalRef.current === null) return;
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        });
    }
  }, [stopTime]);

  useEffect(() => {
    if (hasFinished && isOn) {
      const diffTime = stopTime - startTime;
      axios
        .put(`${envVariables.endpointBase}finish-task`, {
          id: taskNumber,
          diffTime,
          stopTime,
        })
        .then(() => {
          setTaskStatus("completed");
        })
        .catch((err) => {
          const { message } = err.response.data.data;
          handleDisplayMessage(message, setErrorMessage);
        });
      setIsOn(false);
      if (intervalRef.current === null) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (hasFinished && !isOn) {
      const diffTime = 0;
      axios
        .put(`${envVariables.endpointBase}finish-task`, {
          id: taskNumber,
          diffTime,
          stopTime,
        })
        .then(() => {
          setTaskStatus("completed");
        })
        .catch((err) => {
          const { message } = err.response.data.data;
          handleDisplayMessage(message, setErrorMessage);
        });
    }
  }, [hasFinished]);

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
