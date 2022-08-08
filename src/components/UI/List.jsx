import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CustomListItem from "./ListItem";

export default function CustomList({ tasks, projectId }) {
  const primaryTasks = tasks.filter((item) => item.parent === "0");

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {primaryTasks.map((item) => (
        <CustomListItem
          projectId={projectId}
          key={item.id}
          task={item}
          tasks={tasks}
        />
      ))}
    </List>
  );
}
