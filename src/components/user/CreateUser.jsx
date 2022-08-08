import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import CustomModal from "../UI/Modal";
import { useStoreActions } from "easy-peasy";
import { useRef } from "react";

const CreateUser = ({ open, handleClose }) => {
  const addUser = useStoreActions((actions) => actions.addUser);
  const userInputRef = useRef();
  const addUserHandler = () => {
    console.log(userInputRef.current.value);
    addUser(userInputRef.current.value);
    userInputRef.current.value = "";
  };
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Create User</Typography>
      <TextField
        sx={{ mt: 4 }}
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        inputRef={userInputRef}
      />
      <br />
      <Button
        onClick={addUserHandler}
        sx={{ mt: 4 }}
        variant="contained"
        color="success"
      >
        Create User
      </Button>
    </CustomModal>
  );
};

export default CreateUser;
