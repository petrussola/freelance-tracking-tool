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
`;

export default function ErrorMessage() {
  const { errorMessage } = useContext(TimerContext);
  if (errorMessage.length === 0) {
    return <StyledDiv></StyledDiv>;
  }
  return <StyledDiv className="display-error">{errorMessage}</StyledDiv>;
}
