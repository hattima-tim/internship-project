import { useState } from "react";
import Todo from "./features/todoList/todos";
import InProgressTasks from "./features/inProgressList/inProgressTasks";
import FinishedTasks from "./features/finishedTaskList/finishedTasks";

function App() {
  const [userSelectedTab, setUserSelectedTab] = useState("todo");
  const [todos, setTodos] = useState([
    {
      id: crypto.randomUUID(),
      title: "firstTask",
      description: "work",
      state: "todo",
    },
    {
      id: crypto.randomUUID(),
      title: "secondTask",
      description: "study",
      state: "todo",
    },
  ]);
  const [inProgressTasks, setInProgressTasks] = useState([
    {
      id: crypto.randomUUID(),
      title: "firstTask",
      description: "inProgressFirstTask",
      state: "inProgress",
    },
    {
      id: crypto.randomUUID(),
      title: "secondTask",
      description: "inProgressSecondTask",
      state: "inProgress",
    },
  ]);
  const [finishedTasks, setFinishedTasks] = useState([
    {
      id: crypto.randomUUID(),
      title: "firstTask",
      description: "finishedFirstTask",
      state: "done",
    },
    {
      id: crypto.randomUUID(),
      title: "secondTask",
      description: "finishedSecondTask",
      state: "done",
    },
  ]);

  const getTheTask = (from, id) => {
    let taskList;
    if (from === "todo") taskList = todos;
    if (from === "inProgress") taskList = inProgressTasks;

    let task = taskList.find((task) => task.id === id);
    return task;
  };

  const updateTaskList = (from, id) => {
    if (from === "todo") setTodos(todos.filter((todo) => todo.id !== id));
    if (from === "inProgress")
      setInProgressTasks(
        inProgressTasks.filter((inProgress) => inProgress.id !== id)
      );
  };

  const handleTaskMove = (from, to, id) => {
    let task = getTheTask(from, id);

    updateTaskList(from, id);

    if (to === "todo") setTodos([...todos, task]);
    if (to === "inProgress") setInProgressTasks([...inProgressTasks, task]);
    if (to === "done") setFinishedTasks([...finishedTasks, task]);
  };

  return (
    <div>
      <ul className="flex border-b border-gray-200 text-center">
        <li className="flex-1" onClick={() => setUserSelectedTab("todo")}>
          <div className="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium">
            <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
            Todo
          </div>
        </li>

        <li
          className="flex-1 pl-px"
          onClick={() => setUserSelectedTab("inProgress")}
        >
          <div className="block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
            In Progress
          </div>
        </li>

        <li className="flex-1" onClick={() => setUserSelectedTab("done")}>
          <div className="block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
            Done
          </div>
        </li>
      </ul>

      {userSelectedTab === "todo" && (
        <Todo todos={todos} handleTaskMove={handleTaskMove} />
      )}

      {userSelectedTab === "inProgress" && (
        <InProgressTasks inProgressTasks={inProgressTasks} />
      )}

      {userSelectedTab === "done" && (
        <FinishedTasks finishedTasks={finishedTasks} />
      )}
    </div>
  );
}

export default App;
