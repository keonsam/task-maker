import { describe, expect, it, vi } from "vitest";
import DeleteModal from "../src/components/DeleteModal/DeleteModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const handleClose = vi.fn();

describe("Delete Modal", () => {
  it("display default view when loaded", () => {
    render(
      <DeleteModal onClose={handleClose} id="1" title="Task 1" open={true} />,
    );
    screen.getByText("Delete Task");
    const message = screen.getByText(/Are you certain you want to delete/i);

    expect(message).toContainHTML("Task 1");
  });

  it("call update with delete:true when server request is successful", async () => {
    const user = userEvent.setup();
    render(
      <DeleteModal onClose={handleClose} id="1" title="Task 1" open={true} />,
    );
    const confirm = screen.getByRole("button", { name: "Confirm" });

    await user.click(confirm);

    expect(handleClose).toBeCalledTimes(1);
    expect(handleClose).toHaveBeenCalledWith(undefined, undefined, true);
  });

  it("not call update when server request failed", async () => {
    const user = userEvent.setup();
    render(
      <DeleteModal onClose={handleClose} id="2" title="Task 1" open={true} />,
    );

    const confirm = screen.getByRole("button", { name: "Confirm" });

    await user.click(confirm);

    expect(handleClose).toBeCalledTimes(0);
  });

  it("handle on cancel", async () => {
    const user = userEvent.setup();

    render(
      <DeleteModal onClose={handleClose} id="2" title="Task 1" open={true} />,
    );

    const cancel = screen.getByRole("button", { name: "Cancel" });

    await user.click(cancel);

    expect(handleClose).toBeCalledTimes(1);

    expect(handleClose).toHaveBeenCalledWith();
  });
});
