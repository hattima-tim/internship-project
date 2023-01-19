import { useContext } from "react";
import { TodosContext } from "../../taskContexts";
import TaskTable from "../components/taskTable";

export default function Todo() {
  const [todos, handleTaskMove, removeTaskFromFrontend, removeTaskFromBackend] =
    useContext(TodosContext);

  const returnDropDownOption = (task) => {
    return (
      <>
        <div
          className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          role="menuitem"
          onClick={() => handleTaskMove("todo", "inProgress", task.id)}
        >
          In Progress
        </div>

        <div
          className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          role="menuitem"
          onClick={() => handleTaskMove("todo", "done", task.id)}
        >
          Done
        </div>
      </>
    );
  };

  return (
    <TaskTable
      tasks={todos}
      taskState={"Todo"}
      removeTaskFromFrontend={removeTaskFromFrontend}
      removeTaskFromBackend={removeTaskFromBackend}
      returnDropDownOption={returnDropDownOption}
    />
  );
}
