import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

// components
import NavBar from "./components/NavBar";

// routes
import Routes from "./routes/Routes";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 5px solid green;
  min-height: 100vh;
`;

const App = () => {
  return (
    <StyledDiv>
      <NavBar />
      <Routes />
    </StyledDiv>
  );
};

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
