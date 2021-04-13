import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import CreateTask from "../components/CreateTask";
import TaskHistory from "../components/TaskHistory";
import NotFound from "../components/NotFound";
import EditTask from "../components/EditTask";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={CreateTask} />
        <Route path="/history" component={TaskHistory} />
        <Route path="/:taskId" component={EditTask} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
