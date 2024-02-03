import Joi from "joi";

export const taskSchema = Joi.object({
  assignee: Joi.any(),
  description: Joi.string().max(100).allow(""),
  dueDate: Joi.string().isoDate().required(),
  notes: Joi.string().trim().max(255).allow(""),
  priorityLevel: Joi.string().allow("low", "medium", "high").required(),
  status: Joi.string()
    .allow("pending", "in progress", "completed", "canceled")
    .required(),
  title: Joi.string().trim().max(50).required(),
});
