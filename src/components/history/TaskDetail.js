/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;
export default function TaskDetail({ task }) {
  const { length, isFinished } = task;
  const lenghtInNumb = parseInt(length, 10); // because Postgres returns bigint data in string for accuracy reasons http://knexjs.org/#Schema-bigInteger
  const dateObject = new Date(lenghtInNumb);
  return (
    <StyledDiv>
      <section>
        <h1>{`${task.name ? task.name : "No name yet"} |  ${
          dateObject.getHours() - 1
        } hours : ${dateObject.getMinutes()} minutes :  ${dateObject.getSeconds()} seconds | ${
          isFinished ? "Completed 🎉" : "Not finished"
        }`}</h1>
        {!isFinished ? (
          <Link to={`/${task.jobId}`}>
            <button>Go to task</button>
          </Link>
        ) : null}
      </section>
    </StyledDiv>
  );
}
