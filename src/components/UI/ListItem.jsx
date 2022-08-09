import React from "react";
import CustomList from "./List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import CreateTaskForm from "../tasks/CreateTaskForm";
import Card from "@mui/material/Card";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Checkbox, Chip } from "@mui/material";
import { useState } from "react";
import TaskDetail from "../tasks/TaskDetail";

const CustomListItem = ({ projectId, task }) => {
  const [open, setOpen] = React.useState(true);
  const [showTaskForm, setShowTaskForm] = React.useState(false);
  const [checked, setChecked] = useState(
    task.status === "completed" ? false : true
  );
  const [showDetails, setShowDetails] = React.useState(false);
  const subTasks = useStoreState((state) => state.subTasks);
  const updateTask = useStoreActions((actions) => actions.updateTask);

  const projectSubTasks = subTasks.filter(
    (item) => item.projectId === projectId && item.parent === task.id
  );
  const handleChange = (e) => {
    setChecked(!checked);
    console.log(checked);
    if (checked) {
      console.log(`${task.title} is completed`);
      updateTask({ taskId: task.id, parent: task.parent, status: "completed" });
    } else {
      updateTask({ taskId: task.id, parent: task.parent, status: "pending" });
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const showTaskHandler = () => {
    setShowTaskForm(true);
  };
  const closeTaskHandler = () => {
    setShowTaskForm(false);
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <Card sx={{ my: 3 }}>
      <ListItemButton onClick={handleClick}>
        <Checkbox
          value={task.id}
          checked={!checked}
          onChange={handleChange}
          edge="start"
        />
        <ListItemText
          sx={!checked ? { textDecoration: "line-through" } : {}}
          primary={task.title}
        />
        <Chip
          size="small"
          color={task.status === "completed" ? "success" : "error"}
          label={task.status.toUpperCase()}
          sx={{ mr: 2 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {projectSubTasks.length > 0 && (
          <CustomList tasks={projectSubTasks} projectId={projectId} />
        )}
        <Stack my={2} direction="row" spacing={2} justifyContent="center">
          <Button onClick={showTaskHandler}>Add Task</Button>
          <Button onClick={handleShowDetails}>Show Details</Button>
        </Stack>
      </Collapse>

      {showTaskForm && (
        <CreateTaskForm
          open={showTaskForm}
          handleClose={closeTaskHandler}
          projectId={projectId}
          parent={task.id}
        />
      )}

      {showDetails && (
        <TaskDetail
          open={showDetails}
          handleClose={handleCloseDetails}
          task={task}
          subTasks={projectSubTasks}
        />
      )}
    </Card>
  );
};

export default CustomListItem;
