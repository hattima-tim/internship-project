import { useState } from "react";

export default function InProgressTasks({ inProgressTasks, handleTaskMove }) {
  const [dropDownSelectedFor, setDropDownSelectedFor] = useState("");
  const [showStateDropDown, setShowStateDropDown] = useState(false);

  return (
    <div>
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Title
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Description
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              State
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {inProgressTasks.map((task) => (
            <tr key={task.id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {task.title}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {task.description}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <div className="inline-flex items-stretch rounded-md border bg-white dark:border-gray-800 dark:bg-gray-900">
                  <div className="rounded-l-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                    In Progress
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      className="inline-flex h-full items-center justify-center rounded-r-md border-l border-gray-100 px-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      onClick={() => {
                        setShowStateDropDown(!showStateDropDown);
                        setDropDownSelectedFor(task.id);
                      }}
                    >
                      <span className="sr-only">Menu</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {showStateDropDown && dropDownSelectedFor === task.id && (
                      <div
                        className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
                        role="menu"
                      >
                        <div className="flow-root py-2">
                          <div className="-my-2 divide-y divide-gray-100 dark:divide-gray-800">
                            <div className="p-2">
                              <div
                                className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                role="menuitem"
                                onClick={() =>
                                  handleTaskMove("inProgress", "todo", task.id)
                                }
                              >
                                Todo
                              </div>

                              <div
                                className="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                                role="menuitem"
                                onClick={() =>
                                  handleTaskMove("done", "done", task.id)
                                }
                              >
                                Done
                              </div>

                              <div className="p-2">
                                <form method="POST" action="#">
                                  <button
                                    type="submit"
                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
                                    role="menuitem"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete Task
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
