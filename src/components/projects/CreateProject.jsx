import React from "react";
import CustomModal from "../UI/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { useStoreActions } from "easy-peasy";
import Typography from "@mui/material/Typography";
import shortid from "shortid";

const CreateProject = ({ open, handleClose }) => {
  const titleInputRef = useRef();
  const descriptionRef = useRef();
  const addProject = useStoreActions((actions) => actions.addProject);
  const addProjectHandler = () => {
    const projectData = {
      id: shortid.generate(),
      title: titleInputRef.current.value,
      description: descriptionRef.current.value,
    };

    addProject(projectData);
    titleInputRef.current.value = "";
    descriptionRef.current.value = "";
    handleClose();
  };
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Create Project</Typography>
      <TextField
        sx={{ mt: 4, width: "100%" }}
        id="outlined-basic"
        label="Project Title"
        variant="outlined"
        inputRef={titleInputRef}
      />
      <TextField
        sx={{ mt: 4, width: "100%" }}
        multiline
        id="outlined-basic"
        label="Project Descriptions"
        variant="outlined"
        inputRef={descriptionRef}
      />
      <br />
      <Button
        onClick={addProjectHandler}
        sx={{ mt: 4 }}
        variant="contained"
        color="success"
      >
        Create Project
      </Button>
    </CustomModal>
  );
};

export default CreateProject;
