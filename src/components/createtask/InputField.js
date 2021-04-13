import React, { useContext, useEffect } from "react";
import axios from "axios";

// context
import TimerContext from "../../context/context";

// env variables
import { envVariables } from "../../../config/env";

// helpers
import { handleDisplayMessage } from "../../helpers/helpers";

export default function InputField() {
  const {
    taskNumber,
    taskStatus,
    nameTask,
    setNameTask,
    hasStarted,
    setErrorMessage,
    setToastMessage,
    inputField,
    setInputField,
  } = useContext(TimerContext);

  const handleName = (e) => {
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
          const { message } = err.response.data.data;
          handleDisplayMessage(message, setErrorMessage);
        });
    }
  }, [nameTask]);

  return (
    <div>
      <form>
        {nameTask.length > 0 ? (
          nameTask
        ) : (
          <input
            name="nameTask"
            placeholder="Name your task"
            value={inputField}
            onChange={(e) => setInputField(e.target.value)}
            onKeyDown={handleName}
          />
        )}
        {nameTask.length > 0 ? <button onClick={editName}>Edit</button> : null}
        {taskNumber > 0 ? `Task number ${taskNumber}` : null}
        {taskStatus.length > 0 ? `Status: ${taskStatus}` : null}
      </form>
    </div>
  );
}
