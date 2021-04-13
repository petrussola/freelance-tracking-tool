import React, { useContext } from "react";

// components
import TaskDetail from "./TaskDetail";

// context
import TimerContext from "../../context/context";

export default function AllTasks() {
  const { allTasks, filteredTasks } = useContext(TimerContext);

  if (allTasks.length === 0) {
    return <div>No tasks yet</div>;
  }
  
  return (
    <div>
      {filteredTasks.length > 0
        ? filteredTasks.map((task) => (
            <TaskDetail task={task} key={task.jobId} />
          ))
        : allTasks.map((task) => <TaskDetail task={task} key={task.jobId} />)}
    </div>
  );
}
