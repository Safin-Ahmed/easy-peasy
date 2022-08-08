import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import CustomModal from "../UI/Modal";
import CustomSelect from "../UI/Select";
import shortid from "shortid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateTaskForm = ({ open, handleClose, projectId, parent = "0" }) => {
  const addTask = useStoreActions((actions) => actions.addTask);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const addTaskHandler = () => {
    const taskObject = {
      parent: parent,
      id: shortid.generate(),
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
      status: status,
      assignee: user,
      deadline: dateInputRef.current.value,
    };

    addTask({ projectId, task: taskObject });
    titleInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    dateInputRef.current.value = "";
    setUser("");
    setStatus("");
    handleClose();
  };
  const users = useStoreState((state) => state.users);
  const assigneeOptions = users.map((user) => ({ name: user, value: user }));
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Create Task</Typography>
      <TextField
        sx={{ my: 2, width: "100%" }}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        inputRef={titleInputRef}
      />
      <TextField
        sx={{ my: 2, width: "100%" }}
        multiline
        id="outlined-basic"
        label="Descriptions"
        variant="outlined"
        inputRef={descriptionInputRef}
      />

      <CustomSelect
        label="Status"
        value={status}
        setValue={setStatus}
        options={[
          { name: "Completed", value: "completed" },
          { name: "Pending", value: "pending" },
        ]}
      />

      <CustomSelect
        value={user}
        setValue={setUser}
        label="Assignee"
        options={assigneeOptions}
      />
      <input ref={dateInputRef} type="date" />
      <br />
      <Button
        onClick={addTaskHandler}
        sx={{ mt: 4 }}
        variant="contained"
        color="success"
      >
        Create Task
      </Button>
    </CustomModal>
  );
};

export default CreateTaskForm;
