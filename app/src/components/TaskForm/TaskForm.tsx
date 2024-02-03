import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { assignees, priorityLevels, statuses } from "../../data/form";
import FormInput from "../FormInput/FormInput";
import { joiResolver } from "@hookform/resolvers/joi";
import { taskSchema } from "../schemas/taskschema";
import { PriorityLevel, Status, Task } from "../../types/Task";
import { FormProvider, useForm } from "react-hook-form";
import FormDate from "../FormDate/FormDate";
import { createTask, updateTask } from "../../apis/tasks";
import { useEffect, useState } from "react";
import FormAutocomplete, {
  FormAutocompleteOptions,
} from "../FormAutocomplete/FormAutocomplete";

export type TaskModal = {
  open: boolean;
  task: Task | undefined;
};

type TaskInput = {
  assignee?: FormAutocompleteOptions | null;
  description: string;
  dueDate: string;
  notes: string;
  priorityLevel: PriorityLevel;
  status: Status;
  title: string;
};

type Props = {
  open: boolean;
  onClose: (task?: Task, update?: boolean) => void;
  task?: Task;
};
export default function TaskForm({ onClose, open, task }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<TaskInput>({
    resolver: joiResolver(taskSchema),
    defaultValues: {
      assignee: null,
      description: "",
      dueDate: new Date().toISOString(),
      notes: "",
      priorityLevel: "low",
      status: "pending",
      title: "",
    },
  });

  const {
    formState: { isValid },
    setValue,
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = async (data: TaskInput) => {
    setIsLoading(true);
    try {
      if (task?.id) {
        await updateTask(task.id, {
          ...data,
          assignee: data.assignee?.id || "",
        });
      } else {
        await createTask({
          ...data,
          assignee: data.assignee?.id || "",
        });
      }
      onClose(undefined, true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (task?.id) {
      setValue("assignee", task.assignee || null);
      setValue("description", task.description || "");
      setValue("dueDate", task.dueDate);
      setValue("notes", task.notes || "");
      setValue("notes", task.notes || "");
      setValue("priorityLevel", task.priorityLevel);
      setValue("status", task.status);
      setValue("title", task.title);
    } else {
      reset();
    }
  }, [task, setValue, reset]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={() => onClose()}
    >
      <DialogTitle>{task?.id ? "Edit" : "Create"} Task</DialogTitle>
      <DialogContent
        sx={{
          "& .MuiTextField-root": { my: 2 },
        }}
      >
        <FormProvider {...methods}>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormInput
              fullWidth
              id="title"
              label="title"
              name="title"
              variant="outlined"
              required
            />

            <FormInput
              fullWidth
              id="description"
              label="description"
              name="description"
              variant="outlined"
            />

            <FormDate name="dueDate" />

            <FormAutocomplete
              name="assignee"
              label="Assignee"
              options={assignees}
            />

            <FormInput
              fullWidth
              select
              id="priority-level"
              label="Priority Level"
              name="priorityLevel"
              variant="outlined"
              required
            >
              {priorityLevels.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </FormInput>

            <FormInput
              fullWidth
              select
              id="status"
              label="Status"
              name="status"
              variant="outlined"
              required
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </FormInput>

            <FormInput
              fullWidth
              id="notes"
              label="notes"
              name="notes"
              variant="outlined"
              placeholder="Enter notes here..."
              multiline
              minRows={3}
              maxRows={4}
            />
          </Box>
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <Button onClick={() => onClose()} sx={{ mr: 4 }}>
          Close
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
