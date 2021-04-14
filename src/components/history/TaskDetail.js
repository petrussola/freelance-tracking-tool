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

const StyledSection = styled.section`
  padding: 0.5rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #737373;
  border-radius: 5px;
  margin: 0.5rem 0;
  line-height: 2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    padding: 0.5rem;
    button {
      margin: 0.5rem 0 0 0;
      width: 100%;
    }
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
  const definedStartTime = `${startTimeObject.getHours()}:${startTimeObject.getSeconds()} h`;
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
    <StyledSection>
      {`${
        task.name ? task.name : "No name yet 🤷‍♂️ 🤷‍♀️"
      } |  Started on: ${definedStartDate} at ${definedStartTime} | ${
        dateObject.getHours() - 1
      } hours : ${dateObject.getMinutes()} minutes :  ${dateObject.getSeconds()} seconds | ${
        isFinished ? "Completed 🎉" : "Not finished"
      }`}
      <button onClick={handleDelete} value="delete">
        Delete
      </button>
    </StyledSection>
  );
}
