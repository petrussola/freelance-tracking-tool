import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid red;
  width: 100%;
  h1 {
    font-size: 2rem;
    padding: 1rem;
    min-width: 200px;
    text-align: center;
    :hover {
      background-color: red;
      color: white;
    }
  }
  a {
    text-decoration: none;
    color: red;
  }
`;

export default function NavBar() {
  return (
    <StyledDiv>
      <Link to="/">
        <h1>Create Task</h1>
      </Link>
      <Link to="/history">
        <h1>History</h1>
      </Link>
    </StyledDiv>
  );
}
