import React, { useState, useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

// components
import NavBar from "./components/NavBar";

// routes
import Routes from "./routes/Routes";

// context
import TimerContext from "./context/context";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 5px solid green;
  min-height: 100vh;
`;

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(90000);
  const intervalRef = useRef(null);

  const valueContext = {
    hasStarted,
    setHasStarted,
    isOn,
    setIsOn,
    hasFinished,
    setHasFinished,
    timeElapsed,
    setTimeElapsed,
    intervalRef,
  };

  return (
    <TimerContext.Provider value={valueContext}>
      <StyledDiv>
        <NavBar />
        <Routes />
      </StyledDiv>
    </TimerContext.Provider>
  );
};

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
