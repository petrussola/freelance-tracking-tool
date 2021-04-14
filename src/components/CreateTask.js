import React, { useEffect, useContext } from "react";
import styled from "styled-components";

// components
import InputField from "./createtask/InputField";
import Status from "./createtask/Status";
import ShowTimeSpent from "./createtask/ShowTimeSpent";
import TimerControls from "./createtask/TimerControls";

// context
import TimerContext from "../context/context";

// helpers
import { resetTask } from "../helpers/helpers";

const StyledDiv = styled.div`
  border: 0.5px solid #737373;
  box-shadow: 10px 5px 15px #737373;
  border-radius: 5px;
  width: 50%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  div {
    height: 75px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default function CreateTask() {
  const {
    setInputField,
    setNameTask,
    setTaskStatus,
    setHasStarted,
    setIsOn,
    setHasFinished,
    setTimeElapsed,
    setTaskNumber,
    setStartTime,
    setStopTime,
    intervalRef,
  } = useContext(TimerContext);

  useEffect(() => {
    resetTask("", [setTaskStatus, setNameTask, setInputField]);
    resetTask(false, [setHasStarted, setIsOn, setHasFinished]);
    resetTask(0, [setTimeElapsed, setTaskNumber, setStartTime, setStopTime]);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  return (
    <StyledDiv>
      <InputField />
      <Status />
      <ShowTimeSpent />
      <TimerControls />
    </StyledDiv>
  );
}
