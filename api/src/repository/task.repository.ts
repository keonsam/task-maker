import sequelize from "../db/sequelize";
import { Repository } from "sequelize-typescript";
import Task from "../db/models/Task";
import { TaskData } from "../types/task";
import { Pagination } from "../types/pagination";
import { Op } from "sequelize";

export default class TaskRepository {
  taskRepo: Repository<Task>;
  constructor() {
    this.taskRepo = sequelize.getRepository(Task);
  }

  findAll({ pageSize, pageNumber, sort, search, timeline }: Pagination) {
    let whereQ: Record<string, unknown> | undefined = undefined;

    if (!!search) {
      whereQ = {
        [Op.or]: [
          { assignee: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { notes: { [Op.like]: `%${search}%` } },
          { title: { [Op.like]: `%${search}%` } },
          { priorityLevel: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    if (!!timeline) {
      whereQ = whereQ || {};

      if (timeline == "incoming") {
        whereQ = {
          ...whereQ,
          dueDate: {
            [Op.gte]: new Date().toISOString(),
          },
        };
      }

      if (timeline == "past") {
        whereQ = {
          ...whereQ,
          dueDate: {
            [Op.lt]: new Date().toISOString(),
          },
        };
      }
    }

    return this.taskRepo.findAndCountAll({
      where: whereQ,
      limit: pageSize,
      offset: pageNumber * pageSize,
      order: [["dueDate", sort]],
    });
  }

  findByPk(id: string) {
    return this.taskRepo.findByPk(id);
  }

  create(task: TaskData) {
    return this.taskRepo.create(task);
  }

  update(id: string, task: TaskData) {
    return this.taskRepo.update(task, {
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.taskRepo.destroy({
      where: {
        id,
      },
    });
  }
}
