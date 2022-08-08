import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import Collapse from "@mui/material/Collapse";

const NestedList = ({ tasks, projectId, parent }) => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const nestedTasks = tasks.filter((item) => item.parent === task.id);
  return (
    <List component="div" disablePadding>
      {tasks.map((task) => (
        <>
          <ListItemButton onClick={handleClick} sx={{ pl: 4 }}>
            <ListItemText primary={task.title} />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {nestedTasks.length > 0 && (
              <NestedList
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
        </>
      ))}
    </List>
  );
};

export default NestedList;
