import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { TodosContext, InProgressContext, DoneContext } from "./taskContexts";
import Todo from "./features/todoList/todos";
import InProgressTasks from "./features/inProgressList/inProgressTasks";
import FinishedTasks from "./features/finishedTaskList/finishedTasks";
import AddTaskForm from "./features/addTask/addTaskForm";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Rive from "@rive-app/react-canvas";

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
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [userSelectedTab, setUserSelectedTab] = useState("todo");
  const [todos, setTodos] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  useEffect(() => {
    setShowLoadingAnimation(true);
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
      } finally {
        setShowLoadingAnimation(false);
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

  const removeTaskFromFrontend = (from, id) => {
    if (from === "todo") setTodos(todos.filter((todo) => todo.id !== id));
    if (from === "inProgress")
      setInProgressTasks(
        inProgressTasks.filter((inProgress) => inProgress.id !== id)
      );
    if (from === "done")
      setFinishedTasks(finishedTasks.filter((finished) => finished.id !== id));
  };

  const removeTaskFromBackend = async (from, task) => {
    const db = getFirestore();
    const refForRemovingData = doc(db, `tasks/${from}`);

    try {
      await updateDoc(refForRemovingData, {
        [from]: arrayRemove(task),
      });

      return "success";
    } catch (error) {
      alert("Something went wrong while removing the task");
      return "failure";
    }
  };

  const addTaskToFrontend = (to, task) => {
    if (to === "todo") setTodos([...todos, task]);
    if (to === "inProgress") setInProgressTasks([...inProgressTasks, task]);
    if (to === "done") setFinishedTasks([...finishedTasks, task]);
  };

  const addTaskToBackend = async (to, task) => {
    const db = getFirestore();
    const refForAddingData = doc(db, `tasks/${to}`);

    try {
      await updateDoc(refForAddingData, {
        [to]: arrayUnion(task),
      });

      return "success";
    } catch (error) {
      alert("Something went wrong while adding the task");
      return "failure";
    }
  };

  const handleTaskMove = async (from, to, id) => {
    setShowLoadingAnimation(true);
    let task = getTheTask(from, id);
    const removeStatus = await removeTaskFromBackend(from, task);
    if (removeStatus === "failure") return;
    removeTaskFromFrontend(from, id);

    const newTask = { ...task, state: to };
    const addStatus = await addTaskToBackend(to, newTask);
    if (addStatus === "failure") return;
    addTaskToFrontend(to, newTask);
    setShowLoadingAnimation(false);
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 text-center" role="tablist">
        <div
          role="tab"
          className={`relative block cursor-pointer border-t border-l border-r border-gray-200 ${
            userSelectedTab === "todo"
              ? "bg-white text-black"
              : "bg-gray-200 text-gray-500"
          } flex-1 p-4 text-sm font-medium`}
          onClick={() => setUserSelectedTab("todo")}
        >
          Todo
        </div>

        <div
          role="tab"
          className={`block cursor-pointer ${
            userSelectedTab === "inProgress"
              ? "bg-white text-black"
              : "bg-gray-200 text-gray-500"
          } flex-1 p-4 pl-px text-sm font-medium ring-1 ring-inset ring-white `}
          onClick={() => setUserSelectedTab("inProgress")}
        >
          In Progress
        </div>

        <div
          role="tab"
          className={`block cursor-pointer ${
            userSelectedTab === "done"
              ? "bg-white text-black"
              : "bg-gray-200 text-gray-500"
          } flex-1 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white`}
          onClick={() => setUserSelectedTab("done")}
        >
          Done
        </div>
      </div>

      <TodosContext.Provider
        value={[
          todos,
          handleTaskMove,
          removeTaskFromFrontend,
          removeTaskFromBackend,
        ]}
      >
        {userSelectedTab === "todo" && <Todo />}
      </TodosContext.Provider>

      <InProgressContext.Provider
        value={[
          inProgressTasks,
          handleTaskMove,
          removeTaskFromFrontend,
          removeTaskFromBackend,
        ]}
      >
        {userSelectedTab === "inProgress" && <InProgressTasks />}
      </InProgressContext.Provider>

      <DoneContext.Provider
        value={[finishedTasks, removeTaskFromFrontend, removeTaskFromBackend]}
      >
        {userSelectedTab === "done" && <FinishedTasks />}
      </DoneContext.Provider>

      <AddTaskForm
        setTodos={setTodos}
        setInProgressTasks={setInProgressTasks}
        setFinishedTasks={setFinishedTasks}
        setShowLoadingAnimation={setShowLoadingAnimation}
      />
      
      <div
        className={`${
          showLoadingAnimation ? "flex" : "hidden"
        } fixed z-50 w-full justify-center`}
      >
        <Rive
          src="https://public.rive.app/community/runtime-files/1586-3103-epar-loading-v4.riv"
          autoPlay={true}
          style={{ width: "60px", height: "60px" }}
        />
      </div>
    </div>
  );
}

export default App;
