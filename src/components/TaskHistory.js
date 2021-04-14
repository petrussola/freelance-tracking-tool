/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

// components
import BackHomeButton from "./history/BackHomeButton";
import AllTasks from "./history/AllTasks";
import DatePicker from "./history/DatePicker";

// context
import TimerContext from "../context/context";

// env variables
import { envVariables } from "../../config/env";

// helpers
import { handleDisplayMessage } from "../helpers/helpers";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #737373;
  box-shadow: 10px 5px 15px #737373;
  border-radius: 5px;
  width: 85%;
  padding: 2rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default function TaskHistory() {
  const {
    setAllTasks,
    setErrorMessage,
    hasStarted,
    isOn,
    startTime,
    hasFinished,
    taskNumber,
    stopTime,
    setStopTime,
    setIsOn,
    setTaskStatus,
    intervalRef,
    autoPaused,
    setAutoPaused,
    editedTask,
    timeElapsed,
    setEditedTask,
    setIsLoading,
  } = useContext(TimerContext);

  useEffect(() => {
    if (
      hasStarted &&
      startTime &&
      isOn &&
      Object.keys(editedTask).length === 0
    ) {
      const tempPauseTime = Date.now();
      setIsOn(false); // set task as not running
      setAutoPaused(true);
      setStopTime(tempPauseTime);
    } else if (
      hasStarted &&
      startTime &&
      isOn &&
      Object.keys(editedTask).length > 0
    ) {
      setIsOn(false); // set task as not running
      setAutoPaused(true);
      setStopTime(startTime + timeElapsed * 1000);
    }
  }, []);

  useEffect(() => {
    setEditedTask({});
    setIsLoading(true);
    if (hasStarted && startTime && autoPaused && !hasFinished) {
      const diffTime = stopTime - startTime;
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
          setAutoPaused(false);
          getTasks();
        })
        .catch((err) => {
          handleDisplayMessage(err.response.data.data, setErrorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [stopTime]);

  function getTasks() {
    return axios
      .get(`${envVariables.endpointBase}tasks`)
      .then((res) => {
        setAllTasks(res.data.data);
      })
      .catch((err) => {
        handleDisplayMessage(err.response.data.data, setErrorMessage);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${envVariables.endpointBase}tasks`)
      .then((res) => {
        setAllTasks(res.data.data);
      })
      .catch((err) => {
        handleDisplayMessage(err.response.data.data, setErrorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <StyledDiv>
      <DatePicker />
      <AllTasks />
      <BackHomeButton />
    </StyledDiv>
  );
}
