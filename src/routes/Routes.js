import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import CreateTask from "../components/CreateTask";
import TaskHistory from "../components/TaskHistory";
import NotFound from "../components/NotFound";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={CreateTask} />
        <Route path="/history" component={TaskHistory} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
