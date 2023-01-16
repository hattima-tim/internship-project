function App() {
  return (
    <div>
      <ul className="flex border-b border-gray-200 text-center">
        <li className="flex-1">
          <div className="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium">
            <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
            Todo
          </div>
        </li>

        <li className="flex-1 pl-px">
          <div className="block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
            In Progress
          </div>
        </li>

        <li className="flex-1">
          <div className="block bg-gray-100 p-4 text-sm font-medium text-gray-500 ring-1 ring-inset ring-white">
            Done
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
