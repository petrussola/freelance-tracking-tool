import React, { useContext } from "react";
import styled from "styled-components";

// context
import TimerContext from "../context/context";

const StyledDiv = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
  &.display-error {
    color: white;
    background-color: red;
  }
  &.display-toast {
    color: white;
    background-color: green;
  }
`;

export default function DisplayMessage() {
  const { errorMessage, toastMessage } = useContext(TimerContext);
  if (errorMessage.length === 0 && toastMessage.length === 0) {
    return <StyledDiv></StyledDiv>;
  }
  return (
    <StyledDiv
      className={errorMessage.length > 0 ? "display-error" : "display-toast"}
    >
      {errorMessage.length > 0 ? errorMessage : toastMessage}
    </StyledDiv>
  );
}
