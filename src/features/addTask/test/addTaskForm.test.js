import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toMatchDiffSnapshot } from "snapshot-diff";
import AddTaskForm from "../addTaskForm";

expect.extend({ toMatchDiffSnapshot });

test("'add task' button is rendered", () => {
  const { container } = render(<AddTaskForm />);

  expect(container).toMatchSnapshot();
});

test("a form show up on 'add task' button click", async () => {
  const user = userEvent.setup();
  const { asFragment } = render(<AddTaskForm />);
  const firstRender = asFragment();
  const addTaskButton = screen.getByRole("button", { name: "Add Task" });

  await user.click(addTaskButton);

  expect(firstRender).toMatchDiffSnapshot(asFragment());
});

test("typing in title field of 'add task form' works", async () => {
  const user = userEvent.setup();
  render(<AddTaskForm />);
  const addTaskButton = screen.getByRole("button", { name: "Add Task" });

  await user.click(addTaskButton);
  const titleField = screen.getByRole("textbox", {
    name: /title/i,
  });
  await user.type(titleField, "test task");

  expect(titleField).toHaveValue("test task");
});

test("selecting task state option at 'add task form', works", async () => {
  const user = userEvent.setup();
  render(<AddTaskForm />);
  const addTaskButton = screen.getByRole("button", { name: "Add Task" });

  await user.click(addTaskButton);
  const selectElement = screen.getByRole("combobox", {
    name: /Default select example/i,
  });
  await user.selectOptions(selectElement, ["inProgress"]);

  expect(screen.getByRole("option", { name: "In Progress" }).selected).toBe(
    true
  );
  expect(screen.getByRole("option", { name: "Todo" }).selected).toBe(false);
  expect(screen.getByRole("option", { name: "Done" }).selected).toBe(
    false
  );
});
