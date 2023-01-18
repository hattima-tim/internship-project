import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { TodosContext, InProgressContext, DoneContext } from "./taskContexts";
import Todo from "./features/todoList/todos";
import InProgressTasks from "./features/inProgressList/inProgressTasks";
import FinishedTasks from "./features/finishedTaskList/finishedTasks";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMK3rO2M-PTgnBif0jqND1KXxp9dGKgFo",
  authDomain: "internship-project-a4949.firebaseapp.com",
  projectId: "internship-project-a4949",
  storageBucket: "internship-project-a4949.appspot.com",
  messagingSenderId: "938198674073",
  appId: "1:938198674073:web:ba79d3f2ede2b8c5602608",
};

initializeApp(firebaseConfig);

function App() {
  const [userSelectedTab, setUserSelectedTab] = useState("todo");
  const [todos, setTodos] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const db = getFirestore();
      const todoRef = doc(db, `tasks/todo`);
      const inProgressTasksRef = doc(db, "tasks/inProgress");
      const finishedTasksRef = doc(db, "tasks/done");

      try {
        const todosSnap = await getDoc(todoRef);
        const inProgressTasksSnap = await getDoc(inProgressTasksRef);
        const finishedTasksSnap = await getDoc(finishedTasksRef);

        if (!ignore) {
          setTodos(todosSnap.data().todo);
          setInProgressTasks(inProgressTasksSnap.data().inProgress);
          setFinishedTasks(finishedTasksSnap.data().done);
        }
      } catch (error) {
        alert("Something went wrong while fetching data");
      }
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

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

  const updateDataInFirestore = async (from, to, task) => {
    const db = getFirestore();
    const refForAddingData = doc(db, `tasks/${to}`);
    const refForRemovingData = doc(db, `tasks/${from}`);

    try {
      await updateDoc(refForAddingData, {
        [to]: arrayUnion(task),
      });

      await updateDoc(refForRemovingData, {
        [from]: arrayRemove(task),
      });

      return "success";
    } catch (error) {
      alert("Something went wrong while moving the task");
      return "failure";
    }
  };

  const handleTaskMove = async (from, to, id) => {
    let task = getTheTask(from, id);

    const updateStatus = await updateDataInFirestore(from, to, task);
    if (updateStatus === "failure") return;

    updateTaskList(from, id);

    if (to === "todo") setTodos([...todos, task]);
    if (to === "inProgress") setInProgressTasks([...inProgressTasks, task]);
    if (to === "done") setFinishedTasks([...finishedTasks, task]);
  };

  return (
    <div>
      <ul className="flex border-b border-gray-200 text-center">
        <li className="flex-1" onClick={() => setUserSelectedTab("todo")}>
          <div
            className={`relative block border-t border-l border-r border-gray-200 ${
              userSelectedTab === "todo"
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-500"
            } p-4 text-sm font-medium`}
          >
            Todo
          </div>
        </li>

        <li
          className="flex-1 pl-px"
          onClick={() => setUserSelectedTab("inProgress")}
        >
          <div
            className={`block ${
              userSelectedTab === "inProgress"
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-500"
            } p-4 text-sm font-medium ring-1 ring-inset ring-white`}
          >
            In Progress
          </div>
        </li>

        <li className="flex-1" onClick={() => setUserSelectedTab("done")}>
          <div
            className={`block ${
              userSelectedTab === "done"
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-500"
            } p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white`}
          >
            Done
          </div>
        </li>
      </ul>

      <TodosContext.Provider value={[todos, handleTaskMove]}>
        {userSelectedTab === "todo" && <Todo />}
      </TodosContext.Provider>

      <InProgressContext.Provider value={[inProgressTasks, handleTaskMove]}>
        {userSelectedTab === "inProgress" && <InProgressTasks />}
      </InProgressContext.Provider>

      <DoneContext.Provider value={[finishedTasks]}>
        {userSelectedTab === "done" && <FinishedTasks />}
      </DoneContext.Provider>
    </div>
  );
}

export default App;
