import React, { useContext } from "react";

// context
import TimerContext from "../../context/context";

export default function ShowTimeSpent() {
  const { timeElapsed } = useContext(TimerContext);

  const padTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const hours = padTime(Math.floor(timeElapsed / 60 / 60));
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = padTime(timeElapsed - minutes * 60);
  return (
    <div>
      <div>{hours}</div>
      <div>:</div>
      <div>{padTime(minutes % 60)}</div>
      <div>:</div>
      <div>{seconds}</div>
    </div>
  );
}
