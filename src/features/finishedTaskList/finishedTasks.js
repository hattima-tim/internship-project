import { useContext } from "react";
import { DoneContext } from "../../taskContexts";
import TaskTable from "../components/taskTable";

export default function FinishedTasks() {
  const [finishedTasks, removeTaskFromFrontend, removeTaskFromBackend] =
    useContext(DoneContext);

  return (
    <TaskTable
      tasks={finishedTasks}
      taskState={"Done"}
      removeTaskFromFrontend={removeTaskFromFrontend}
      removeTaskFromBackend={removeTaskFromBackend}
    />
  );
}
