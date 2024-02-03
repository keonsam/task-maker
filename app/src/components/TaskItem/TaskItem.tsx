import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  IconButtonProps,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import { Task } from "../../types/Task";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type TaskItemProps = {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
};

export default function TaskItem({ onDelete, onEdit, task }: TaskItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { title, description, assignee, status, priorityLevel, notes } = task;

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dueDate = dayjs(task.dueDate);

  const getStatusColor = (() => {
    if (status === "pending") {
      return "success";
    } else if (status === "in progress") {
      return "secondary";
    } else if (status === "completed") {
      return "primary";
    } else {
      return "error";
    }
  })();

  return (
    <ListItem sx={{ px: 0 }}>
      <Card sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto", display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                pr: 2,
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                component="p"
                fontWeight="300"
                textAlign="center"
              >
                {dueDate.format("h:mm A")}
              </Typography>
              <Typography variant="subtitle2">
                {dueDate.format("ddd MMM YYYY")}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50ch",
                mr: "auto",
              }}
            >
              <Typography variant="h6" component="h3" fontWeight={400} noWrap>
                {title}{" "}
              </Typography>
              {/* move to collapse on mobile*/}
              <Typography
                variant="body1"
                color="grey.700"
                sx={{
                  display: { xs: "none", sm: "-webkit-box" },
                  WebkitLineClamp: "2",
                  wordBreak: "break-all",
                  maxWidth: { sm: "25ch", md: "50ch" },
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {description}
              </Typography>
              {notes && (
                <Box>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    size="small"
                  >
                    <ExpandMoreIcon fontSize="inherit" />
                  </ExpandMore>
                </Box>
              )}
            </Box>
            {/* move to collapse on mobile */}
            <Box
              sx={{
                width: { sm: "20ch" },
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="caption" noWrap>
                Assignee:{" "}
                <Typography component="span" variant="subtitle2">
                  {assignee?.label || "Nil"}
                </Typography>
              </Typography>
              <Typography variant="caption">
                Status:{" "}
                <Chip
                  label={status}
                  color={getStatusColor}
                  size="small"
                  sx={{ textTransform: "capitalize", mr: 1 }}
                />
              </Typography>
              <Typography variant="caption">
                Priority:{" "}
                <Typography
                  component="span"
                  variant="subtitle2"
                  textTransform="capitalize"
                >
                  {priorityLevel || ""}
                </Typography>
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
            }}
          >
            <IconButton
              id="more-options-button"
              aria-controls={open ? "options-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              aria-label="options"
              size="small"
              onClick={handleClick}
              sx={{
                display: { xs: "flex", sm: "none", alignSelf: "flex-start" },
              }}
            >
              <MoreVertIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              id="edit"
              aria-label="edit"
              onClick={onEdit}
              size="small"
              sx={{
                color: "primary.main",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              id="delete"
              aria-label="delete"
              onClick={onDelete}
              size="small"
              sx={{ color: "error.main", display: { xs: "none", sm: "flex" } }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </CardActions>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Notes:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                pl: 1,
                display: "-webkit-box",
                WebkitLineClamp: "4",
                wordBreak: "break-all",
                maxWidth: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
              }}
            >
              {notes}
            </Typography>
          </CardContent>
        </Collapse>
        <Menu
          id="options-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "options-menu-button",
          }}
        >
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>
      </Card>
    </ListItem>
  );
}
