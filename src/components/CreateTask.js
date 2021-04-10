import React from "react";
import styled from "styled-components";

// components
import InputField from "./createtask/InputField";
import ShowTimeSpent from "./createtask/ShowTimeSpent";
import TimerControls from "./createtask/TimerControls";

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

export default function CreateTask() {
  return (
    <StyledDiv>
      <InputField />
      <ShowTimeSpent />
      <TimerControls />
    </StyledDiv>
  );
}
