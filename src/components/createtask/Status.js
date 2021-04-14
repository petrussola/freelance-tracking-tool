import React, { useContext } from "react";

// context
import TimerContext from "../../context/context";

export default function Status() {
  const { isLoading, taskStatus } = useContext(TimerContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>{taskStatus.length > 0 ? `Status: ${taskStatus}` : null}</div>
  );
}
