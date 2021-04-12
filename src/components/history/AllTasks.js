import React, { useContext } from "react";

// components
import TaskDetail from "./TaskDetail";

// context
import TimerContext from "../../context/context";

export default function AllTasks() {
  const { allTasks } = useContext(TimerContext);
  return (
    <div>
      {allTasks.length === 0 ? (
        <div>No tasks yet</div>
      ) : (
        allTasks.map((task) => <TaskDetail task={task} key={task.jobId} />)
      )}
    </div>
  );
}
