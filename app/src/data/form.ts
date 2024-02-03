import { PriorityLevel, Status } from "../types/Task";

export const priorityLevels: PriorityLevel[] = ["low", "medium", "high"];

export const statuses: Status[] = [
  "pending",
  "in progress",
  "completed",
  "canceled",
];

export const assignees = [
  { label: "John Doe", id: "1" },
  { label: "Jane Smith", id: "2" },
  { label: "Alice Johnson", id: "3" },
  { label: "Dave Williams", id: "4" },
  { label: "Brian Harris", id: "5" },
  { label: "Ethan Thomas", id: "6" },
  { label: "Joshua Robinson", id: "7" },
  { label: "Blake Walker", id: "7" },
  { label: "Antonio Scott", id: "8" },
  { label: "Harvey Nelson", id: "9" },
  { label: "Claude Mitchell", id: "10" },
];
