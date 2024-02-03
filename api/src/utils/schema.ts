import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const getSchema = Joi.object({
  pageNumber: Joi.number().min(0),
  pageSize: Joi.number().min(1),
  sort: Joi.string().allow("ASC", "DESC").only(),
  search: Joi.string().trim(),
  timeline: Joi.string().allow("all", "incoming", "past"),
});

export const taskSchema = Joi.object({
  assignee: Joi.string().trim().allow(""),
  description: Joi.string().trim().allow(""),
  dueDate: Joi.string().isoDate().required(),
  notes: Joi.string().trim().allow(""),
  priorityLevel: Joi.string().allow("low", "medium", "high").required(),
  status: Joi.string()
    .allow("pending", "in progress", "completed", "canceled")
    .required(),
  title: Joi.string().trim().required(),
});
