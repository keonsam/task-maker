import { ApiTask, Task, TaskData } from "../types/Task";
import { ApiList, List, Pagination } from "../types/Pagination";
import { assignees } from "../data/form";

const taskUrl = `${import.meta.env.VITE_API_URL}/tasks`;

// used fetch instead of axios for experiment and avoid adding another library

export const getTasks = async (page: Pagination) => {
  const q = getQuery(page);
  return fetch(`${taskUrl}?${q}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  }).then(async (res) => {
    // backend join logic , leave in frontend to simple the backend and add complex logic to the fronted
    const data: ApiList<ApiTask> = await res.json();
    return {
      total: data.count,
      data: mapTasks(data.rows),
    };
  });
};

export const createTask = async (task: TaskData): Promise<List<Task>> => {
  return fetch(taskUrl, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
};

export const updateTask = async (id: string, task: Partial<TaskData>) => {
  return fetch(`${taskUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
};

export const deleteTask = async (id: string) => {
  return fetch(`${taskUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
};

// helpers
function getQuery({ pageNumber, pageSize, sort, search, timeline }: Pagination) {
  const fields = [];

  if (pageNumber) {
    fields.push(`pageNumber=${pageNumber}`);
  }

  if (pageSize) {
    fields.push(`pageSize=${pageSize}`);
  }

  if (sort) {
    fields.push(`sort=${sort}`);
  }

  if (search) {
    fields.push(`search=${search}`);
  }

  if (timeline) {
    fields.push(`timeline=${timeline}`);
  }

  return fields.join("&");
}

function mapTasks(tasks: ApiTask[]): Task[] {
  return tasks.map((t) => {
    return {
      ...t,
      assignee: assignees.find((a) => a.id === t.assignee),
    };
  });
}
