import React, { useContext } from "react";
import styled from "styled-components";

// context
import TimerContext from "../../context/context";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 3rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default function Status() {
  const { isLoading, taskStatus } = useContext(TimerContext);
  if (isLoading) {
    return <StyledDiv>Loading...</StyledDiv>;
  }
  return (
    <StyledDiv>
      {taskStatus.length > 0 ? `Status: ${taskStatus}` : null}
    </StyledDiv>
  );
}
