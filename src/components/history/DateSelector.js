/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";

// context
import TimerContext from "../../context/context";

export default function DateSelector({ from, to, name, type }) {
  const { datePick, setDatePick } = useContext(TimerContext);
  let dates = [];
  for (let i = from; i < to + 1; i++) {
    dates.push(i);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (e, name, type) => {
    e.preventDefault();
    setDatePick({
      ...datePick,
      [type]: { ...datePick[type], [name]: e.target.value },
    });
  };

  return (
    <select onChange={(e) => handleChange(e, name, type)}>
      <option
        value=""
        selected={!datePick[type][name] ? true : false}
        data-cy={type === "from" && name === "month" ? "month-button" : null}
      >{`--Choose a ${name}--`}</option>
      {dates.map((date) => (
        <option value={date} key={date}>
          {name === "month" ? months[date] : date}
        </option>
      ))}
    </select>
  );
}
