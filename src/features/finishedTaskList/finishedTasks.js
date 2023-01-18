import { useContext} from "react";
import { DoneContext } from "../../taskContexts";
import TaskTable from "../components/taskTable";

export default function FinishedTasks() {
  const [finishedTasks] = useContext(DoneContext);

  return (
    <TaskTable tasks={finishedTasks} taskState={'Done'}/>
  );
}
