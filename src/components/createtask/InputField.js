import React, { useState, useContext } from "react";

// context
import TimerContext from "../../context/context";

export default function InputField() {
  const [inputField, setInputField] = useState("");
  const [nameTask, setNameTask] = useState("");
  const { taskNumber, taskStatus } = useContext(TimerContext);

  const handleName = (e) => {
    if (e.code === "Enter") {
      setNameTask(inputField);
    }
  };

  const editName = () => {
    setNameTask("");
  };

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
