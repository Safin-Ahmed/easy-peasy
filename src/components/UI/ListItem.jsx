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
import NestedList from "./NestedList";

const CustomListItem = ({ tasks, projectId, task }) => {
  const [open, setOpen] = React.useState(true);
  const [showTaskForm, setShowTaskForm] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const showTaskHandler = () => {
    setShowTaskForm(true);
  };
  const closeTaskHandler = () => {
    setShowTaskForm(false);
  };

  const nestedTasks = tasks.filter((item) => item.parent === task.id);

  console.log(nestedTasks);
  return (
    <Card sx={{ my: 3 }}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={task.title} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {nestedTasks.length > 0 && (
          <CustomListItem
            tasks={nestedTasks}
            projectId={projectId}
            parent={task.id}
          />
        )}

        <Stack my={2} direction="row" spacing={2}>
          <Button onClick={showTaskHandler}>Add Task</Button>
          <Button>Show Details</Button>
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
    </Card>
  );
};

export default CustomListItem;
