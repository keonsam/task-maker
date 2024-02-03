import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../src/components/TaskForm/TaskForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task } from "../src/types/Task";

const handleClose = vi.fn();

const task = {
  id: "1",
  title: "Task 1",
  dueDate: "2023-06-10",
  assignee: {
    id: "1",
    label: "John Doe",
  },
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  notes: "This task requires immediate attention.",
  priorityLevel: "high",
  status: "pending",
  createdAt: "2023-06-11",
  updatedAt: "2023-06-12",
};

describe("Task Form", () => {
  it("create task", async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TaskForm open={true} onClose={handleClose} />{" "}
      </LocalizationProvider>,
    );
    const user = userEvent.setup();

    screen.getByText("Create Task");

    const title = screen.getByRole("textbox", { name: /title/i });
    const description = screen.getByRole("textbox", { name: /description/i });
    // const dueDate = screen.getByRole("button", { name: /open/i });
    // const assignee = screen.getByRole("combobox", { name: /assignee/i });
    // const priorityLevel = screen.getByRole("combobox", {
    //   name: /priority level/i,
    // });
    // const status = screen.getByRole("combobox", { name: /status/i });
    const notes = screen.getByRole("textbox", { name: /notes/i });
    const confirm = screen.getByRole("button", { name: /Submit/i });

    await user.type(title, task.title);
    await user.type(description, task.description);
    await user.type(notes, task.notes);

    expect(title).toHaveValue(task.title);
    expect(description).toHaveValue(task.description);
    expect(notes).toHaveValue(task.notes);

    await user.click(confirm);

    expect(handleClose).toBeCalledTimes(1);
    expect(handleClose).toBeCalledWith(undefined, true);
  });

  it("update task", async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TaskForm open={true} onClose={handleClose} task={task as Task} />
      </LocalizationProvider>,
    );
    const user = userEvent.setup();

    screen.getByText("Edit Task");

    const title = screen.getByRole("textbox", { name: /title/i });
    const description = screen.getByRole("textbox", { name: /description/i });
    // const dueDate = screen.getByRole("button", { name: /open/i });
    // const assignee = screen.getByRole("combobox", { name: /assignee/i });
    // const priorityLevel = screen.getByRole("combobox", {
    //   name: /priority level/i,
    // });
    // const status = screen.getByRole("combobox", { name: /status/i });
    const notes = screen.getByRole("textbox", { name: /notes/i });
    const confirm = screen.getByRole("button", { name: /Submit/i });

    expect(title).toHaveValue(task.title);
    expect(description).toHaveValue(task.description);
    expect(notes).toHaveValue(task.notes);

    await user.clear(title);
    await user.clear(description);
    await user.clear(notes);

    await user.type(title, "Task 2");
    await user.type(description, "A description");
    await user.type(notes, "A notes");

    expect(title).toHaveValue("Task 2");
    expect(description).toHaveValue("A description");
    expect(notes).toHaveValue("A notes");

    await user.click(confirm);

    expect(handleClose).toBeCalledTimes(1);
    expect(handleClose).toBeCalledWith(undefined, true);
  });
});
