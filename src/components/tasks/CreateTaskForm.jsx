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

const CreateTaskForm = ({
  open,
  handleClose,
  projectId,
  parent = "0",
  isEdit = false,
  task,
}) => {
  const addTask = useStoreActions((actions) => actions.addTask);
  const editTask = useStoreActions((actions) => actions.editTask);
  const [status, setStatus] = useState(isEdit ? task.status : "");
  const [user, setUser] = useState(isEdit ? task.assignee : []);
  const [title, setTitle] = useState(isEdit ? task.title : "");
  const [description, setDescription] = useState(
    isEdit ? task.description : ""
  );
  const [date, setDate] = useState(isEdit ? task.deadline : "");
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const addTaskHandler = () => {
    const taskObject = {
      parent: parent,
      projectId,
      id: shortid.generate(),
      title: title,
      description: description,
      status: status,
      assignee: user,
      deadline: date,
    };

    addTask(taskObject);
    setTitle("");
    setDescription("");
    setDate("");
    setUser([]);
    setStatus("");
    handleClose();
  };

  const updateTask = () => {
    const taskObject = {
      parent: task.parent,
      id: task.id,
      title: title,
      description: description,
      status: status,
      assignee: user,
      deadline: date,
    };
    editTask(taskObject);
    setTitle("");
    setDescription("");
    setDate("");
    setUser([]);
    setStatus("");
    handleClose();
  };

  const users = useStoreState((state) => state.users);
  const assigneeOptions = users.map((user) => ({ name: user, value: user }));
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Typography variant="h6">
        {isEdit ? "Edit Task" : "Create Task"}
      </Typography>
      <TextField
        sx={{ my: 2, width: "100%" }}
        id="outlined-basic"
        value={title}
        label="Title"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        sx={{ my: 2, width: "100%" }}
        multiline
        id="outlined-basic"
        value={description}
        label="Description"
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />

      <CustomSelect
        label="Status"
        value={status}
        setValue={setStatus}
        options={[
          { name: "Pending", value: "pending" },
          { name: "Completed", value: "completed" },
        ]}
      />

      <CustomSelect
        value={user}
        setValue={setUser}
        label="Assignee"
        options={assigneeOptions}
        isMultiple={true}
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
      />
      <br />
      <Button
        onClick={isEdit ? updateTask : addTaskHandler}
        sx={{ mt: 4 }}
        variant="contained"
        color="success"
      >
        {isEdit ? "Update Task" : "Create Task"}
      </Button>
    </CustomModal>
  );
};

export default CreateTaskForm;
