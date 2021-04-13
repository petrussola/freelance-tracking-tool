/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// components
import InputField from "./createtask/InputField";
import ShowTimeSpent from "./createtask/ShowTimeSpent";
import TimerControls from "./createtask/TimerControls";

// context
import TimerContext from "../context/context";

// env variables
import { envVariables } from "../../config/env";

// helpers
import { handleDisplayMessage } from "../helpers/helpers";

const StyledDiv = styled.div`
  border: 5px solid blue;
  width: 50%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  div {
    height: 75px;
    width: 100%;
    border: 1px solid green;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default function EditTask({ match }) {
  const { taskId } = match.params;
  const {
    setTimeElapsed,
    setHasStarted,
    setTaskNumber,
    setNameTask,
    setInputField,
    setErrorMessage,
    intervalRef,
    setStartTime,
    setStopTime,
    setTaskStatus
  } = useContext(TimerContext);

  useEffect(() => {
    axios
      .get(`${envVariables.endpointBase}task-${taskId}`)
      .then((res) => {
        const { length, jobId, name } = res.data.data;
        setTimeElapsed(Math.floor(length / 1000));
        setHasStarted(true);
        setTaskNumber(jobId);
        setNameTask(name);
        setInputField(name);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setStartTime(0);
        setStopTime(0);
        setTaskStatus("paused");
      })
      .catch((err) => {
        const { message } = err.response.data.data;
        handleDisplayMessage(message, setErrorMessage);
      });
  }, []);
  return (
    <StyledDiv>
      <InputField />
      <ShowTimeSpent />
      <TimerControls />
    </StyledDiv>
  );
}
