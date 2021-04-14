/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// context
import TimerContext from "../../context/context";

// env variables
import { envVariables } from "../../../config/env";

// helpers
import { handleDisplayMessage } from "../../helpers/helpers";

const StyledDiv = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  button {
    border: 1px solid green;
    color: white;
    background-color: green;
    @media (max-width: 600px) {
      min-width: 90%;
      margin: 0.5rem 0;
    }
    :disabled {
      background-color: grey;
      border: 1px solid grey;
    }
  }
`;

export default function TimerControls() {
  const {
    hasStarted,
    setHasStarted,
    isOn,
    setIsOn,
    setIsLoading,
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
    setNameTask,
    setInputField,
    editedTask,
    timeElapsed,
  } = useContext(TimerContext);

  const handleStartPause = () => {
    if (!hasStarted && !isOn) {
      // if task is not started - will trigger 1st useEffect
      setTaskStatus("Recording");
      const tempStartTime = Date.now();
      setStartTime(tempStartTime);
    } else if (hasStarted && isOn && Object.keys(editedTask).length === 0) {
      // if task is started and is running, pause task - will trigger 2nd useEffect
      const tempPauseTime = Date.now();
      setStopTime(tempPauseTime);
    } else if (hasStarted && isOn && Object.keys(editedTask).length > 0) {
      setStopTime(startTime + timeElapsed * 1000);
    } else if (hasStarted && !isOn && Object.keys(editedTask).length === 0) {
      // if task is started but it is paused, restart task and set isOn - will trigger 1st useEffect
      const tempStartTime = Date.now();
      setStartTime(tempStartTime);
    } else if (hasStarted && !isOn && Object.keys(editedTask).length > 0) {
      setStartTime(
        parseInt(editedTask.startTime, 10) + parseInt(editedTask.length, 10)
      );
    }
  };

  const handleStop = () => {
    const tempStopTime = Date.now();
    setStopTime(tempStopTime); // setting stop time - will trigger 2nd useEffect
    setHasFinished(true); // set task as complet - trigger 3rd useEffect
  };

  // when reset button is clicked
  const resetTask = () => {
    setHasStarted(false);
    setIsOn(false);
    setHasFinished(false);
    // clearInterval(intervalRef.current);
    // intervalRef.current = null;
    setTimeElapsed(0);
    setTaskNumber(0);
    setStartTime(0);
    setStopTime(0);
    setTaskStatus("");
    setNameTask("");
    setInputField("");
  };

  useEffect(() => {
    if (!hasStarted && !isOn && startTime > 0) {
      // first time task is started (start time is set in previous step)
      setHasStarted(true); // set as task started
      setIsOn(true); // set as task running
      setIsLoading(true); // set as loading while we wait for confirmation from server that task has been created. timer will only start when server response is ok
      axios
        .post(`${envVariables.endpointBase}create-task`, {
          name: nameTask,
          startTime,
        })
        .then((res) => {
          let id;
          // get task id back from server and set local state for future use
          if (res.data.data.id.jobId) {
            id = res.data.data.id.jobId; // postgres returns the id column name
          } else {
            id = res.data.data.id; // sqlite return the id, less nested than postgress
          }
          setTaskNumber(id); // set task id as local state
          // start counter
          intervalRef.current = setInterval(() => {
            // starts at 0 (time elapsed, and adds 1 every 1000 miliseconds)
            setTimeElapsed((timeElapsed) => {
              return timeElapsed + 1;
            });
          }, 1000);
        })
        .catch((err) => {
          // if server gives no response, it is likely to be down
          if (!err.response) {
            handleDisplayMessage(
              "The server seems to be offline. Please check with the owner of the app :)",
              setErrorMessage
            );
          }
          // display error messages
          handleDisplayMessage(err.response.data.data, setErrorMessage);
        })
        .finally(() => {
          // clear loading state
          setIsLoading(false);
        });
    } else if (hasStarted && !isOn) {
      // if task is paused when start/pause button is clicked
      setIsOn(true); // set as running, again
      // restart the counter
      intervalRef.current = setInterval(() => {
        setTimeElapsed((timeElapsed) => {
          return timeElapsed + 1;
        });
      }, 1000);
    }
  }, [startTime]);

  useEffect(() => {
    if (isOn && stopTime > 0 && startTime > 0 && !hasFinished) {
      setIsOn(false); // set task as not running
      setIsLoading(true);
      let diffTime;
      if (Object.keys(editedTask).length > 0) {
        diffTime = timeElapsed * 1000 - editedTask.length;
      } else {
        diffTime = stopTime - startTime;
      }
      // if active task has been paused, we need to save interval of time in the server
      axios
        .put(`${envVariables.endpointBase}pause-task`, {
          id: taskNumber,
          diffTime,
        })
        .then(() => {
          setTaskStatus("Paused"); // once server confirms pausing has been saved, we sync frontend
          if (intervalRef.current === null) return;
          clearInterval(intervalRef.current); // we clear the interval to stop it
          intervalRef.current = null;
        })
        .catch((err) => {
          handleDisplayMessage(err.response.data.data, setErrorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
      // }
    }
  }, [stopTime]);

  useEffect(() => {
    if (hasFinished && isOn) {
      // when task is stopped while running
      // update server with needed info: additional length of the session + end time
      setIsLoading(true);
      let diffTime;
      if (Object.keys(editedTask).length > 0) {
        diffTime = timeElapsed * 1000 - editedTask.length;
      } else {
        diffTime = stopTime - startTime;
      }
      axios
        .put(`${envVariables.endpointBase}finish-task`, {
          id: taskNumber,
          diffTime,
          stopTime,
        })
        .then(() => {
          setTaskStatus("Completed"); // set status as completed
        })
        .catch((err) => {
          handleDisplayMessage(err.response.data.data, setErrorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
      setIsOn(false);
      if (intervalRef.current === null) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (hasFinished && !isOn) {
      // if task is stopped while paused
      const diffTime = 0; // the new length to add is 0 since we don't want to increment the length in the server
      setIsLoading(true);
      axios
        .put(`${envVariables.endpointBase}finish-task`, {
          id: taskNumber,
          diffTime,
          stopTime,
        })
        .then(() => {
          setTaskStatus("Completed");
        })
        .catch((err) => {
          handleDisplayMessage(err.response.data.data, setErrorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [hasFinished]);

  return (
    <StyledDiv>
      <button
        onClick={handleStartPause}
        disabled={hasFinished ? true : false}
        data-cy="start-pause-button"
      >
        {isOn ? "Pause" : hasStarted ? "Restart" : "Start"}
      </button>
      {hasStarted ? (
        <button onClick={handleStop} disabled={hasFinished ? true : false}>
          Stop
        </button>
      ) : null}
      {hasFinished ? <button onClick={resetTask}>Start New Task</button> : null}
    </StyledDiv>
  );
}
