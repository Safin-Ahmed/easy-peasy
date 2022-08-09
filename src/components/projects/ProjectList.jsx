import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useStoreState } from "easy-peasy";
import Grid from "@mui/material/Grid";
import CreateProject from "./CreateProject";
import Project from "./Project";

const ProjectList = () => {
  const projects = useStoreState((state) => state.projects);
  const tasks = useStoreState((state) => state.tasks);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const openHandler = () => {
    setShowProjectForm(true);
  };
  const closeHandler = () => {
    setShowProjectForm(false);
  };
  return (
    <section style={{ padding: "80px 0" }}>
      <Container>
        <Typography align="center" variant="h2">
          Projects
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Button onClick={openHandler} sx={{ my: 5 }} variant="contained">
            Create Project
          </Button>
        </Stack>
        {projects.length === 0 && (
          <Typography variant="body1">You have no projects yet</Typography>
        )}
        {projects.length > 0 && (
          <>
            <Grid container spacing={2}>
              {projects.map((project, i) => (
                <Grid item xs={6} md={4} key={`project${i}`}>
                  <Project project={project} tasks={tasks} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {showProjectForm && (
          <CreateProject open={showProjectForm} handleClose={closeHandler} />
        )}
      </Container>
    </section>
  );
};

export default ProjectList;
