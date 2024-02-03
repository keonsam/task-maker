import { TaskData } from "../types/task";
import TaskRepository from "../repository/task.repository";
import { Pagination } from "../types/Pagination";

export default class TaskService {
  taskRepo: TaskRepository;
  constructor() {
    this.taskRepo = new TaskRepository();
  }

  findAll(pagination: Pagination) {
    return this.taskRepo.findAll(pagination);
  }

  findOne(id: string) {
    return this.taskRepo.findByPk(id);
  }

  create(task: TaskData) {
    return this.taskRepo.create(task);
  }

  update(id: string, task: TaskData) {
    return this.taskRepo.update(id, task);
  }

  delete(id: string) {
    return this.taskRepo.delete(id);
  }
}
