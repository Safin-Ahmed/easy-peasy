import React from "react";
import CustomCard from "../UI/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TaskList from "../tasks/TaskList";

const Project = ({ project, tasks }) => {
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  return (
    <CustomCard projectId={project.id}>
      <Typography sx={{ my: 2, fontSize: "32px" }} variant="h2">
        {project.title}
      </Typography>
      <Typography sx={{ my: 3 }} variant="body1">
        {project.description}
      </Typography>
      <TaskList project={project} tasks={projectTasks} />
    </CustomCard>
  );
};

export default Project;
