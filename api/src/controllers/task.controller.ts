import { Router, Request, Response, NextFunction } from "express";
import TaskService from "../services/task.service";
import { TaskData } from "../types/task";
import { Pagination, Sort, Timeline } from "../types/pagination";
import { validate } from "../middleware/validation";
import { getSchema, idSchema, taskSchema } from "../utils/schema";

class TaskController {
  taskService: TaskService;
  constructor() {
    this.taskService = new TaskService();
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("find All Tasks Request");
    try {
      const { query } = req;
      const pagination: Pagination = {
        pageNumber: Number(query.pageNumber || 0),
        pageSize: Number(query.pageSize || 5),
        sort: (query.sort as Sort) || "DESC",
        search: String(query.search || ""),
        timeline: String(query.timeline || "all") as Timeline,
      };
      const result = await this.taskService.findAll(pagination);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("find Task Request");
    try {
      const { id } = req.params;
      const result = await this.taskService.findOne(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Create Task Request");

    try {
      const task: TaskData = req.body;

      const result = await this.taskService.create(task);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Update Task Request");

    try {
      const { id } = req.params;
      const task: TaskData = req.body;

      const result = await this.taskService.update(id, task);
      res.status(200).json({ affected: result[0] });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    req.log.info("Delete Task Request");

    try {
      const { id } = req.params;

      const result = await this.taskService.delete(id);
      res.status(200).json({ affected: result });
    } catch (error) {
      next(error);
    }
  };
}

const taskController = new TaskController();

const taskRouter = Router();

taskRouter.get("/tasks", validate(getSchema, "query"), taskController.findAll);

taskRouter.get(
  "/tasks/:id",
  validate(idSchema, "params"),
  taskController.findOne,
);

taskRouter.post("/tasks", validate(taskSchema, "body"), taskController.create);

taskRouter.put(
  "/tasks/:id",
  validate(idSchema, "params"),
  validate(taskSchema, "body"),
  taskController.update,
);

taskRouter.delete(
  "/tasks/:id",
  validate(idSchema, "params"),
  taskController.delete,
);

export default taskRouter;
