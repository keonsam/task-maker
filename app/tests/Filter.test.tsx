import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Filter from "../src/components/Filter/Filter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const handlePage = vi.fn();

describe("Filter", () => {
  describe("Search", () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("call search handle only after user finish typing", async () => {
      const user = userEvent.setup();
      render(
        <Filter
          onPage={handlePage}
          sort="ASC"
          prevSearch=""
          preTimeline="incoming"
        />,
      );

      const search = screen.getByRole("textbox", { name: /search/i });

      await user.type(search, "Task 1");

      expect(search).toHaveValue("Task 1");
      vi.runAllTimers();
      expect(handlePage).toBeCalledTimes(1);
      expect(handlePage).toBeCalledWith({ search: "Task 1" });
    });

    it("call search handle only after user finish typing", async () => {
      const user = userEvent.setup();
      render(
        <Filter
          onPage={handlePage}
          sort="ASC"
          prevSearch="Task 1"
          preTimeline="incoming"
        />,
      );

      const search = screen.getByRole("textbox", { name: /search/i });

      await user.type(search, "Task 1");

      expect(search).toHaveValue("Task 1");
      vi.runAllTimers();
      expect(handlePage).toBeCalledTimes(0);
    });
  });

  describe("Order", () => {
    it("icon update sort to 'DESC' when click", async () => {
      const user = userEvent.setup();

      render(
        <Filter
          onPage={handlePage}
          sort="ASC"
          prevSearch="Task 1"
          preTimeline="incoming"
        />,
      );

      const sortIcon = screen.getByRole("button", { name: /sort/i });

      await user.click(sortIcon);

      expect(handlePage).toHaveBeenCalledTimes(1);
      expect(handlePage).toHaveBeenCalledWith({ sort: "DESC" });
    });

    it("icon update sort to 'ASC' when click", async () => {
      const user = userEvent.setup();

      render(
        <Filter
          onPage={handlePage}
          sort="DESC"
          prevSearch="Task 1"
          preTimeline="incoming"
        />,
      );

      const sortIcon = screen.getByRole("button", {
        name: /sort/i,
      });

      await user.click(sortIcon);

      expect(handlePage).toHaveBeenCalledTimes(1);
      expect(handlePage).toHaveBeenCalledWith({ sort: "ASC" });
    });
  });

  describe("Due Date", () => {
    it("pass the correct pagination when clicked", async () => {
      const user = userEvent.setup();

      render(
        <Filter
          onPage={handlePage}
          sort="ASC"
          prevSearch="Task 1"
          prevTimeline="incoming"
        />,
      );

      const dueDate = screen.getByLabelText(/Due Date/i);

      await user.click(dueDate);

      // all

      const all = screen.getByRole("option", { name: /all/i });

      await user.click(all);

      expect(handlePage).toHaveBeenCalledTimes(1);
      expect(handlePage).toHaveBeenCalledWith({ timeline: "all" });

      // past

      await user.click(dueDate);

      const past = screen.getByRole("option", { name: /past/i });

      await user.click(past);

      expect(handlePage).toHaveBeenCalledTimes(2);
      expect(handlePage).toHaveBeenCalledWith({ timeline: "past" });
    });

    it("not update pagination when the same option is selected", async () => {
      const user = userEvent.setup();

      render(
        <Filter
          onPage={handlePage}
          sort="ASC"
          prevSearch="Task 1"
          prevTimeline="incoming"
        />,
      );

      const dueDate = screen.getByLabelText(/Due Date/i);

      await user.click(dueDate);

      const incoming = screen.getByRole("option", { name: /incoming/i });

      await user.click(incoming);

      expect(handlePage).not.toHaveBeenCalled();
    });
  });
});
