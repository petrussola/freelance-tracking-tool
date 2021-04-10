import React, { useState } from "react";

const initialState = {
  taskName: "",
};

export default function SetNameTask({ setTaskName, nameRef }) {
  const [nameTask, setNameTask] = useState(initialState);

  const changeHandle = (e) => {
    setNameTask({
      ...nameTask,
      [e.target.name]: e.target.value,
    });
  };

  const keyDownHandle = (e) => {
    if (e.code === "Enter") {
      nameRef.current = nameTask.taskName;
      setTaskName(nameTask.taskName);
    }
  };

  return (
    <input
      type="text"
      name="taskName"
      value={nameTask.taskName}
      placeholder="Set name of task"
      onChange={changeHandle}
      onKeyDown={keyDownHandle}
    />
  );
}
