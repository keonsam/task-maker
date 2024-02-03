export type PriorityLevel = "low" | "medium" | "high";

export type Status = "pending" | "in progress" | "completed" | "canceled";

export type TaskData = {
  assignee: string;
  description: string;
  dueDate: Date;
  notes: string;
  priorityLevel: PriorityLevel;
  status: Status;
  title: string;
};
