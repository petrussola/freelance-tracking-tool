import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

// components
import BackHomeButton from "./history/BackHomeButton";
import AllTasks from "./history/AllTasks";

// context
import TimerContext from "../context/context";

// env variables
import { envVariables } from "../../config/env";

// helpers
import { handleDisplayMessage } from "../helpers/helpers";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function TaskHistory() {
  const { setAllTasks, setErrorMessage } = useContext(TimerContext);
  // truggers useEffect in App.js and downloads the latest info from database. It may have been stalled since the time User loaded data from DB (change name, change lenght of task, etc.)
  useEffect(() => {
    axios
      .get(`${envVariables.endpointBase}tasks`)
      .then((res) => {
        setAllTasks(res.data.data);
      })
      .catch((err) => {
        const { message } = err.response.data.data;
        handleDisplayMessage(message, setErrorMessage);
      });
  }, []);

  return (
    <StyledDiv>
      <AllTasks />
      <BackHomeButton />
    </StyledDiv>
  );
}
