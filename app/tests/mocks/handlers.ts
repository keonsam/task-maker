import { HttpResponse, http } from "msw";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.post(`${apiUrl}/tasks`, async ({ request }) => {
    const task = (await request.json()) as { title: string };
    task;
    if (task?.title === "Task 1") {
      return HttpResponse.json(task, { status: 200 });
    } else {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  http.put(`${apiUrl}/tasks/:id`, async ({ params }) => {
    const { id } = params;

    if (id === "1") {
      return HttpResponse.json({ affected: 1 }, { status: 200 });
    } else {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  http.delete(`${apiUrl}/tasks/:id`, ({ params }) => {
    const { id } = params;
    if (id === "1") {
      return HttpResponse.json({ affected: 1 }, { status: 200 });
    } else {
      return new HttpResponse(null, { status: 401 });
    }
  }),
];
