import { useContext } from "react";
import { InProgressContext } from "../../taskContexts";
import TaskTable from "../components/taskTable";

export default function InProgressTasks() {
  const [inProgressTasks,handleTaskMove] = useContext(InProgressContext);

  const returnDropDownOption = (task)=>{
    return (
      <>
        <div
          className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          role="menuitem"
          onClick={() => handleTaskMove("inProgress", "todo", task.id)}
        >
          Todo
        </div>

        <div
          className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          role="menuitem"
          onClick={() => handleTaskMove("inProgress", "done", task.id)}
        >
          Done
        </div>
      </>
    );
  }
  return (
    <TaskTable
      tasks={inProgressTasks}
      taskState={"In Progress"}
      returnDropDownOption={returnDropDownOption}
    />
  );
}
