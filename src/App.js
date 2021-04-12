import React, { useState, useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";

// components
import NavBar from "./components/NavBar";
import DisplayMessage from "./components/DisplayMessage";

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
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [taskNumber, setTaskNumber] = useState(0);
  const [nameTask, setNameTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(0);
  const [taskStatus, setTaskStatus] = useState("");
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
    taskNumber,
    setTaskNumber,
    errorMessage,
    setErrorMessage,
    startTime,
    setStartTime,
    stopTime,
    setStopTime,
    taskStatus,
    setTaskStatus,
    nameTask,
    setNameTask,
    toastMessage,
    setToastMessage,
  };

  return (
    <TimerContext.Provider value={valueContext}>
      <StyledDiv>
        <NavBar />
        <DisplayMessage />
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
