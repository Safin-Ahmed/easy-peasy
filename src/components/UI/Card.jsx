import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useStoreActions } from "easy-peasy";

export default function CustomCard({ children, projectId }) {
  const removeProject = useStoreActions((actions) => actions.removeProject);
  const removeHandler = () => {
    console.log(projectId);
    removeProject({ id: projectId });
  };
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent>{children}</CardContent>
      <CardActions>
        <Button onClick={removeHandler} size="small">
          Remove Project
        </Button>
      </CardActions>
    </Card>
  );
}
