import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom"; // or >> import REACTDOM from 'react-dom'
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

// components
import SetNameTask from "./components/DELETEMEOldSetNameTask";

const initialState = {
  day: "",
  month: "",
  year: "",
  hour: "",
  minute: "",
  seconds: "",
};

const App = () => {
  const [startTime, setStartTime] = useState(initialState);
  const [stopTime, setStopTime] = useState(initialState);
  const [duration, setDuration] = useState(initialState);
  const [taskName, setTaskName] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    from: undefined,
    to: undefined,
  });
  const nameRef = useRef(null);

  const handleStart = () => {
    const start = new Date();
    setStartTime({
      day: start.getDate(),
      month: start.getMonth(),
      year: start.getFullYear(),
      hour: start.getHours(),
      minute: start.getMinutes(),
      seconds: start.getSeconds(),
    });
  };

  const handleStop = () => {
    const stop = new Date();
    const stopTime = Date.parse(stop);
    console.log(new Date(stopTime));
    setStopTime({
      day: stop.getDate(),
      month: stop.getMonth(),
      year: stop.getFullYear(),
      hour: stop.getHours(),
      minute: stop.getMinutes(),
      seconds: stop.getSeconds(),
    });
    const test = startTime.day - stopTime.day;
    setDuration({
      day: test,
      month: startTime.month - stopTime.month,
      year: startTime.year - stopTime.year,
      hour: startTime.hour - stopTime.hour,
      minute: startTime.minute - stopTime.minute,
      seconds: startTime.seconds - stopTime.seconds,
    });
  };

  useEffect(() => {
    setTaskName(nameRef.current);
    console.log(selectedDate.from && selectedDate.from.getTime());
  }, [selectedDate]);

  const modifiers = { start: selectedDate.from, end: selectedDate.to };

  const handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, selectedDate);
    setSelectedDate(range);
  };

  const resetDate = () => {
    setSelectedDate({ from: undefined, to: undefined });
  };

  return (
    <div>
      <div>
        {taskName || (
          <SetNameTask setTaskName={setTaskName} nameRef={nameRef} />
        )}
      </div>
      <button onClick={handleStart}>Start</button>
      <div>
        {startTime.day.length === 0 ||
          `Start time: ${startTime.day} / ${startTime.month} / ${startTime.year} | ${startTime.hour} : ${startTime.minute} : ${startTime.seconds}`}
      </div>
      <button onClick={handleStop}>Stop</button>
      <div>
        {stopTime.day.length === 0 ||
          `Stop time: ${stopTime.day} / ${stopTime.month} / ${stopTime.year} | ${stopTime.hour} : ${stopTime.minute} : ${stopTime.seconds}`}
      </div>
      <div>
        {duration.seconds.length === 0 ||
          `Duration time: ${duration.day} / ${duration.month} / ${duration.year} | ${duration.hour} : ${duration.minute} : ${duration.seconds}`}
      </div>
      <button onClick={() => setShowCalendar(!showCalendar)}>Pick date</button>
      <button onClick={resetDate}>Reset date</button>
      {!showCalendar || (
        <DayPicker
          className="Selectable"
          modifiers={modifiers}
          selectedDays={[
            selectedDate.from,
            { from: selectedDate.from, to: selectedDate.to },
          ]}
          onDayClick={handleDayClick}
        />
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
