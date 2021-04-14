import React, { useContext } from "react";
import styled from "styled-components";

// components
import TaskDetail from "./TaskDetail";

// context
import TimerContext from "../../context/context";

const StyledDiv = styled.div`
  padding: 3rem;
`;

export default function AllTasks() {
  const { allTasks, filteredTasks } = useContext(TimerContext);

  if (allTasks.length === 0) {
    return <div>No tasks yet</div>;
  }

  return (
    <StyledDiv>
      {filteredTasks.length > 0
        ? filteredTasks.map((task) => (
            <TaskDetail task={task} key={task.jobId} />
          ))
        : allTasks.map((task) => <TaskDetail task={task} key={task.jobId} />)}
    </StyledDiv>
  );
}
