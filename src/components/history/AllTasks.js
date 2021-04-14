import React, { useContext } from "react";
import styled from "styled-components";

// components
import TaskDetail from "./TaskDetail";

// context
import TimerContext from "../../context/context";

const StyledDiv = styled.div`
  padding: 3rem;
  @media (max-width: 600px) {
    width: 100%;
    padding: 0;
  }
`;

export default function AllTasks() {
  const { allTasks, filteredTasks, isFiltered, isLoading } = useContext(
    TimerContext
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (allTasks.length === 0) {
    return <div>No tasks yet</div>;
  } else if (isFiltered && filteredTasks.length === 0) {
    return <div>No tasks match your search criteria</div>;
  }

  return (
    <StyledDiv>
      {filteredTasks && isFiltered
        ? filteredTasks.map((task) => (
            <TaskDetail task={task} key={task.jobId} />
          ))
        : allTasks.map((task) => <TaskDetail task={task} key={task.jobId} />)}
    </StyledDiv>
  );
}
