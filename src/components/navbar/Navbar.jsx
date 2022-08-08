import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import CreateUser from "../user/CreateUser";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Management
          </Typography>
          <Button onClick={handleOpen} color="inherit">
            Create User
          </Button>
        </Toolbar>
      </AppBar>
      {showModal && <CreateUser open={showModal} handleClose={handleClose} />}
    </Box>
  );
}
