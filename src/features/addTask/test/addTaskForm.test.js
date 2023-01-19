import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toMatchDiffSnapshot } from "snapshot-diff";
import AddTaskForm from "../addTaskForm";

expect.extend({ toMatchDiffSnapshot });

test("'add task' button is rendered", () => {
  const { container } = render(<AddTaskForm />);

  expect(container).toMatchSnapshot();
});

test("a form show up on 'add task' button click",async()=>{
    const user = userEvent.setup();
    const {asFragment} = render(<AddTaskForm/>);
    const firstRender = asFragment();
    const addTaskButton = screen.getByRole('button',{name:'Add Task'});

    await user.click(addTaskButton);
    
    expect(firstRender).toMatchDiffSnapshot(asFragment());
});
