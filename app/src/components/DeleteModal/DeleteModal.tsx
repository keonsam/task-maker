import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteTask } from "../../apis/tasks";
import { useState } from "react";

export type IDeleteModal = {
  id: string;
  title: string; // could be changed for more comprehensive message
  open: boolean;
};

type DeleteModalProps = {
  onClose: (id?: string, title?: string, del?: boolean) => void;
} & IDeleteModal;

export default function DeleteModal({
  id,
  title,
  open,
  onClose,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(id);
      onClose(undefined, undefined, true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you certain you want to delete {title}? Please note that this
          action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button
          onClick={handleDelete}
          autoFocus
          color="error"
          disabled={isDeleting}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
