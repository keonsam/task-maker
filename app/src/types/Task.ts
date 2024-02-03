export type PriorityLevel = "low" | "medium" | "high";

export type Status = "pending" | "in progress" | "completed" | "canceled";

export type Assignee = {
  id: string;
  label: string;
};

export type Task = {
  id: string;
  assignee?: Assignee;
  description?: string;
  dueDate: string;
  notes?: string;
  priorityLevel: PriorityLevel;
  status: Status;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiTask = Omit<Task, "assignee"> & {
  assignee: string;
};

export type TaskData = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "assignee"
> & {
  assignee: string;
};
