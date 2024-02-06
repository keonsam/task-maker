import {
  Box,
  Container,
  List,
  Pagination,
  Typography,
} from "@mui/material";
import NewButton from "../NewButton/NewButton";
import { useCallback, useState } from "react";
import TaskForm, { TaskModal } from "../TaskForm/TaskForm";
import useTasks from "../../hooks/useTasks";
import TaskItem from "../TaskItem/TaskItem";
import { Task } from "../../types/Task";
import DeleteModal, { IDeleteModal } from "../DeleteModal/DeleteModal";
import { Pagination as IPagination } from "../../types/Pagination";
import Filter from "../Filter/Filter";

const minPageSize = 5;

export default function TaskList() {
  const [page, setPage] = useState<IPagination>({
    pageNumber: 0,
    pageSize: minPageSize,
    sort: "ASC",
    search: "",
    timeline: "all",
  });
  const [showTaskModal, setShowTaskModal] = useState<TaskModal>({
    open: false,
    task: undefined,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<IDeleteModal>({
    id: "",
    open: false,
    title: "",
  });

  const { isLoading, error, data: items, total, updateList } = useTasks(page);

  const handleToggleTaskForm = (task?: Task, update?: boolean) => {
    setShowTaskModal({
      open: !showTaskModal.open,
      task: task,
    });

    if (update) {
      updateList();
    }
  };

  const handleToggleDeleteModal = (id = "", title = "", del?: boolean) => {
    const { pageNumber } = page || {};

    setShowDeleteModal({
      id,
      open: !showDeleteModal.open,
      title,
    });

    if (del && items.length === 1 && !!pageNumber) {
      setPage({
        ...page,
        pageNumber: pageNumber - 1,
      });
    } else if (del) {
      updateList();
    }
  };

  const handlePage = useCallback(
    (newPage: IPagination) => {
      setPage({
        ...page,
        ...newPage,
      });
    },
    [page],
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "calc(100vh-64px)",
        overflow: "auto",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          my: 2,
          flexGrow: 1,
        }}
      >
        <NewButton onClick={handleToggleTaskForm} />
        <Filter
          onPage={handlePage}
          sort={page.sort}
          prevSearch={page.search}
          prevTimeline={page.timeline}
        />
        {items.length > 0 ? (
          <>
            <List>
              {items.map((task) => (
                <TaskItem
                  task={task}
                  key={task.id}
                  onEdit={() => handleToggleTaskForm(task)}
                  onDelete={() => handleToggleDeleteModal(task.id, task.title)}
                />
              ))}
            </List>
            {total > (page?.pageSize || minPageSize) && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={Math.ceil(total / (page?.pageSize || minPageSize))}
                  color="primary"
                  variant="outlined"
                  onChange={(e, p) => handlePage({ pageNumber: p - 1 })}
                />
              </Box>
            )}
          </>
        ) : (
          <Typography
            sx={{ textAlign: "center", mt: 4 }}
            variant="h5"
            color="grey.500"
          >
            No Task
          </Typography>
        )}
        <TaskForm {...showTaskModal} onClose={handleToggleTaskForm} />
        <DeleteModal {...showDeleteModal} onClose={handleToggleDeleteModal} />
      </Container>
    </Box>
  );
}
