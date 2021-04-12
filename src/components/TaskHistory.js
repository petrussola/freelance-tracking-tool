import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

// components
import BackHomeButton from "./history/BackHomeButton";
import AllTasks from "./history/AllTasks";
import DatePicker from "./history/DatePicker";

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
      <DatePicker />
      <AllTasks />
      <BackHomeButton />
    </StyledDiv>
  );
}
