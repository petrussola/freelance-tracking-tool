/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";

// env variables
import { envVariables } from "../../../config/env";

// context
import TimerContext from "../../context/context";

// helpers
import { handleDisplayMessage } from "../../helpers/helpers";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 3rem;
  section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
  }
`;
export default function TaskDetail({ task }) {
  const { setAllTasks, setToastMessage, setErrorMessage } = useContext(
    TimerContext
  );
  const { length, isFinished, startTime } = task;
  const startTimeObject = new Date(startTime);
  const definedStartDate = `${startTimeObject.getDate()}/${
    startTimeObject.getMonth() + 1
  }/${startTimeObject.getFullYear()}`;
  const lenghtInNumb = parseInt(length, 10); // because Postgres returns bigint data in string for accuracy reasons http://knexjs.org/#Schema-bigInteger
  const dateObject = new Date(lenghtInNumb);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${envVariables.endpointBase}task/${task.jobId}/delete`)
      .then((res) => {
        const { data } = res.data;
        setAllTasks(data);
        handleDisplayMessage("Task deleted", setToastMessage);
      })
      .catch((err) => {
        handleDisplayMessage(err.response.data.data, setErrorMessage);
      });
  };

  return (
    <StyledDiv>
      <section>
        {`${
          task.name ? task.name : "No name yet 🤷‍♂️ 🤷‍♀️"
        } |  Started on: ${definedStartDate} | ${
          dateObject.getHours() - 1
        } hours : ${dateObject.getMinutes()} minutes :  ${dateObject.getSeconds()} seconds | ${
          isFinished ? "Completed 🎉" : "Not finished"
        }`}
        <button onClick={handleDelete} value="delete">
          Delete
        </button>
      </section>
    </StyledDiv>
  );
}
