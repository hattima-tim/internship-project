import { useState } from "react";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function AddTaskForm({
  setTodos,
  setInProgressTasks,
  setFinishedTasks,
}) {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("todo");

  const updateFrontEnd = (state, newTask) => {
    if (state === "todo") setTodos((prevData) => [...prevData, newTask]);
    if (state === "inProgress")
      setInProgressTasks((prevData) => [...prevData, newTask]);
    if (state === "done")
      setFinishedTasks((prevData) => [...prevData, newTask]);
  };

  const updateBackend = async (newTask) => {
    const db = getFirestore();
    const ref = doc(db, `tasks/${state}`);

    try {
      await updateDoc(ref, {
        [state]: arrayUnion(newTask),
      });
      return "success";
    } catch (error) {
      alert("Something went wrong while adding task to the database");
      return "failure";
    }
  };

  const handleTaskAdd = async (e) => {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      state,
    };

    const updateStatus = await updateBackend(newTask);
    if (updateStatus === "failure") return;
    updateFrontEnd(state, newTask);
    setShowAddTaskForm(false);
  };

  return (
    <>
      {!showAddTaskForm ? (
        <div
          className="absolute bottom-4 right-4 mr-2 inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          onClick={() => setShowAddTaskForm(true)}
        >
          Add Task
        </div>
      ) : (
        <div className="absolute top-[8%] flex w-full items-center justify-center px-2">
          <div className=" max-w-lg bg-white">
            <form className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
              <div>
                <label htmlFor="text" className="text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  id="text"
                  className="mt-1 w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="text" className="text-sm font-medium">
                  State
                </label>

                <select
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-4 pr-12 text-sm shadow-sm"
                  aria-label="Default select example"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="todo">Todo</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>

                <textarea
                  id="description"
                  className="mt-1 w-full rounded-lg border border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  rows="2"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
                onClick={handleTaskAdd}
              >
                Add Task
              </button>
              <div
                className="cursor-pointer text-center underline"
                onClick={() => setShowAddTaskForm(false)}
              >
                Cancel
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
