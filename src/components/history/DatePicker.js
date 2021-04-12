import React, { useContext } from "react";
import styled from "styled-components";

// components
import DateSelector from "./DateSelector";

// context
import TimerContext from "../../context/context";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  > select {
    padding: 0.5rem;
  }
`;

export default function DatePicker() {
  const {
    allTasks,
    datePick,
    filteredTasks,
    setFilteredTasks,
    setDatePick,
  } = useContext(TimerContext);
  const handleFilter = () => {
    const { day: day1, month: month1, year: year1 } = datePick.from;
    const { day: day2, month: month2, year: year2 } = datePick.to;
    const dateLowerEnd = new Date(
      parseInt(year1, 10),
      parseInt(month1, 10),
      parseInt(day1, 10)
    );
    const dateLowerEndParsed = Date.parse(dateLowerEnd);
    const dateHigherEnd = new Date(
      parseInt(year2, 10),
      parseInt(month2, 10),
      parseInt(day2, 10)
    );
    const dateHigherEndParsed = Date.parse(dateHigherEnd);
    const filteredData = allTasks.filter((task) => {
      return (
        task.startTime > dateLowerEndParsed &&
        task.startTime < dateHigherEndParsed
      );
    });
    setFilteredTasks(filteredData);
  };
  const clearFilter = () => {
    setFilteredTasks([]);
    setDatePick({
      from: {
        day: undefined,
        month: undefined,
        year: undefined,
      },
      to: {
        day: undefined,
        month: undefined,
        year: undefined,
      },
    });
  };
  return (
    <StyledDiv>
      From:
      <DateSelector from={1} to={31} name="day" type="from" />
      <DateSelector from={0} to={11} name="month" type="from" />
      <DateSelector from={2021} to={2021} name="year" type="from" />
      To:
      <DateSelector from={1} to={31} name="day" type="to" />
      <DateSelector from={0} to={11} name="month" type="to" />
      <DateSelector from={2021} to={2021} name="year" type="to" />
      {filteredTasks.length === 0 ? (
        <button onClick={handleFilter}>Filter</button>
      ) : (
        <button onClick={clearFilter}>Clear filter</button>
      )}
    </StyledDiv>
  );
}
