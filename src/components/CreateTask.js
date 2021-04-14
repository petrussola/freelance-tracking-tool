/* eslint-disable react/prop-types */
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
  padding: 2rem;
  @media (max-width: 600px) {
    width: 95vw;
    padding: 0.5rem;
  }
`;

export default function CreateTask({ match }) {
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
    editedTask,
    setEditedTask,
    allTasks,
  } = useContext(TimerContext);

  const { taskId } = match.params;
  if (taskId) {
    const data = allTasks.filter((task) => {
      return task.jobId === parseInt(taskId, 10);
    });
    setEditedTask(data[0]);
  }

  useEffect(() => {
    if (Object.keys(editedTask).length > 0) {
      setInputField(editedTask.name);
      setNameTask(editedTask.name);
      setHasStarted(true);
      setTimeElapsed(Math.floor(editedTask.length / 1000));
      setTaskNumber(editedTask.jobId);
    } else {
      resetTask("", [setTaskStatus, setNameTask, setInputField]);
      resetTask(false, [setHasStarted, setIsOn, setHasFinished]);
      resetTask(0, [setTimeElapsed, setTaskNumber, setStartTime, setStopTime]);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [editedTask]);

  return (
    <StyledDiv>
      <InputField />
      <Status />
      <ShowTimeSpent />
      <TimerControls />
    </StyledDiv>
  );
}
