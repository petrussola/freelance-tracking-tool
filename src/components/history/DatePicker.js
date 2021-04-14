import React, { useContext } from "react";
import styled from "styled-components";

// components
import DateSelector from "./DateSelector";

// context
import TimerContext from "../../context/context";

// helpers
import { handleDisplayMessage } from "../../helpers/helpers";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  > select {
    padding: 0.5rem;
    @media (max-width: 600px) {
      margin: 0.5rem 0;
      width: 100%;
    }
  }
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

export default function DatePicker() {
  const {
    allTasks,
    datePick,
    filteredTasks,
    setFilteredTasks,
    setDatePick,
    isFiltered,
    setIsFiltered,
    setErrorMessage,
  } = useContext(TimerContext);
  const handleFilter = () => {
    const { day: day1, month: month1, year: year1 } = datePick.from;
    const { day: day2, month: month2, year: year2 } = datePick.to;
    const dateLowerEnd = new Date(
      parseInt(year1, 10),
      parseInt(month1, 10),
      parseInt(day1, 10),
      0,
      0
    );
    const dateLowerEndParsed = Date.parse(dateLowerEnd);
    const dateHigherEnd = new Date(
      parseInt(year2, 10),
      parseInt(month2, 10),
      parseInt(day2, 10), // adds 1 so we can cover the full day. Otherwise, it gets created at 00:00 am
      23,
      58
    );
    const dateHigherEndParsed = Date.parse(dateHigherEnd);
    if (dateHigherEndParsed < dateLowerEndParsed) {
      handleDisplayMessage(
        '"To" date must be later than "from" date',
        setErrorMessage
      );
    } else {
      const filteredData = allTasks.filter((task) => {
        return (
          parseInt(task.startTime, 10) > dateLowerEndParsed &&
          parseInt(task.startTime, 10) < dateHigherEndParsed
        ); // converting to integer because bigInt is returned as string for accuracy reasons http://knexjs.org/#Schema-bigInteger
      });
      setIsFiltered(true);
      setFilteredTasks(filteredData);
    }
  };
  const clearFilter = () => {
    setFilteredTasks([]);
    setIsFiltered(false);
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
      {filteredTasks.length === 0 && !isFiltered ? (
        <button onClick={handleFilter}>Filter</button>
      ) : (
        <button onClick={clearFilter}>Clear</button>
      )}
    </StyledDiv>
  );
}
