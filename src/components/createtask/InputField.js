import React, { useState } from "react";

export default function InputField() {
  const [inputField, setInputField] = useState("");
  const [nameTask, setNameTask] = useState("");

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
      </form>
    </div>
  );
}
