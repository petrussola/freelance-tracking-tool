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
  min-height: 100vh;
  width: 95%;
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // while making api calls to the backend
  const [autoPaused, setAutoPaused] = useState(false); // when user goes to history without pausing, the task will autopause
  const [timeElapsed, setTimeElapsed] = useState(0); // keeps track of time elapsed in the counter
  const [taskNumber, setTaskNumber] = useState(0); // keeps track of the task being created and counted
  const [inputField, setInputField] = useState(""); // values that User types in the input field for the task name
  const [nameTask, setNameTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [startTime, setStartTime] = useState(0); // tracks length of session
  const [stopTime, setStopTime] = useState(0); // tracks length of session
  const [taskStatus, setTaskStatus] = useState(""); // task status displayed on screen
  const [allTasks, setAllTasks] = useState([]); // grabs all tasks when User lands in History
  const [isFiltered, setIsFiltered] = useState(false); // tracks if User is filtering results
  const [filteredTasks, setFilteredTasks] = useState([]); // tracks filtered tasks
  const [editedTask, setEditedTask] = useState({}); // tracks tasks being edited after User continues previously unfinished task
  const [datePick, setDatePick] = useState({
    from: {
      day: undefined,
      month: undefined,
      year: undefined,
    },
    to: {
      day: undefined,
      month: undefined,
      year: undefined,
    },
  }); // tracks filter dates
  const intervalRef = useRef(null); // allows elapsed time to persist across component rendering

  const valueContext = {
    hasStarted,
    setHasStarted,
    isOn,
    setIsOn,
    isLoading,
    setIsLoading,
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
    allTasks,
    setAllTasks,
    datePick,
    setDatePick,
    filteredTasks,
    setFilteredTasks,
    inputField,
    setInputField,
    autoPaused,
    setAutoPaused,
    isFiltered,
    setIsFiltered,
    editedTask,
    setEditedTask,
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
