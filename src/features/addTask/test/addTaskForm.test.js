import { render } from "@testing-library/react";
import AddTaskForm from "../addTaskForm";

test('add task button is rendered',()=>{
    const {container} = render(<AddTaskForm/>);

    expect(container).toMatchSnapshot();
})
