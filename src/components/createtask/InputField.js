/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// context
import TimerContext from "../../context/context";

// env variables
import { envVariables } from "../../../config/env";

// helpers
import { handleDisplayMessage } from "../../helpers/helpers";

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  max-width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  input {
    height: 3rem;
    padding: 0 3rem;
    margin-left: 15%;
    border: 0.2px solid #737373;
    border-radius: 5px;
    font-size: 1.5rem;
    width: 50%;
    @media (max-width: 600px) {
      margin: 0.5rem;
      width: 90%;
    }
  }
  button {
    border: 1px solid green;
    color: white;
    background-color: green;
    @media (max-width: 600px) {
      width: 90%;
    }
  }

  h1 {
    width: 50%;
    margin-left: 15%;
    padding-left: 3rem;
  }
`;

export default function InputField() {
  const {
    taskNumber,
    nameTask,
    setNameTask,
    hasStarted,
    setErrorMessage,
    setToastMessage,
    inputField,
    setInputField,
  } = useContext(TimerContext);

  const handleName = (e) => {
    if (e.target.localName === "button") {
      e.preventDefault();
      setNameTask(inputField);
    }
    if (e.code === "Enter") {
      setNameTask(inputField);
    }
  };

  const editName = () => {
    setNameTask("");
  };

  useEffect(() => {
    if (hasStarted && nameTask.length > 0) {
      axios
        .put(`${envVariables.endpointBase}edit-name`, {
          name: nameTask,
          id: taskNumber,
        })
        .then(() => {
          handleDisplayMessage(
            "Name of the task has been changed",
            setToastMessage
          );
        })
        .catch((err) => {
          handleDisplayMessage(err.response.data.data, setErrorMessage);
        });
    }
  }, [nameTask]);

  return (
    <StyledDiv>
      <form onSubmit={handleName}>
        {nameTask.length > 0 ? (
          <h1>{nameTask}</h1>
        ) : (
          <>
            <input
              name="nameTask"
              placeholder="Name your task"
              value={inputField}
              onChange={(e) => setInputField(e.target.value)}
              onKeyDown={handleName}
            />
            <button onClick={handleName}>Save Name</button>
          </>
        )}
        {nameTask.length > 0 ? (
          <button onClick={editName}>Edit Name</button>
        ) : null}
      </form>
    </StyledDiv>
  );
}
