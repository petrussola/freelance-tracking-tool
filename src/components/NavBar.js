import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #737373;
  width: 100%;
  color: #737373;
  h1 {
    font-size: 2rem;
    padding: 1rem;
    min-width: 200px;
    text-align: center;
    :hover {
      background-color: #737373;
      color: white;
    }
  }
  a {
    text-decoration: none;
    color: #737373;
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
