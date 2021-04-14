import React, { useContext } from "react";
import styled from "styled-components";

// context
import TimerContext from "../../context/context";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  div {
    font-size: 3rem;
  }
`;

export default function ShowTimeSpent() {
  const { timeElapsed } = useContext(TimerContext);

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const hours = padTime(Math.floor(timeElapsed / 60 / 60));
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = padTime(timeElapsed - minutes * 60);
  return (
    <StyledDiv>
      <div>{hours}</div>
      <div>:</div>
      <div>{padTime(minutes % 60)}</div>
      <div>:</div>
      <div>{seconds}</div>
    </StyledDiv>
  );
}
