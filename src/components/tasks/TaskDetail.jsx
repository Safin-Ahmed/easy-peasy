import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useStoreActions } from "easy-peasy";
import React from "react";
import { useState } from "react";
import CustomModal from "../UI/Modal";
import CreateTaskForm from "./CreateTaskForm";

const TaskDetail = ({ task, subTasks, open, handleClose }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const removeTask = useStoreActions((actions) => actions.removeTask);

  const handleRemove = (payload) => {
    removeTask(payload);
  };
  const handleShow = () => {
    setShowTaskForm(true);
  };

  const closeHandler = () => {
    setShowTaskForm(false);
  };
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Box>
        <Typography variant="h4" sx={{ my: 2 }}>
          {task.title}
        </Typography>
        <Typography sx={{ my: 3 }} variant="body1">
          {task.description}
        </Typography>
        {subTasks.map((item) => (
          <Card key={item.id} sx={{ my: 4 }}>
            <CardContent>
              <Typography sx={{ my: 2 }} variant="h6">
                {item.title}
              </Typography>
              <Chip
                size="small"
                color={item.status === "completed" ? "success" : "error"}
                label={item.status.toUpperCase()}
                sx={{ mr: 2 }}
              />
              <Chip color="error" size="small" label={item.deadline} />
              {item.assignee.length > 0 && (
                <Box>
                  {item.assignee.map((subItem) => (
                    <Chip
                      sx={{ my: 2, mr: 1, "&:last-child": { mr: 0 } }}
                      color="primary"
                      size="small"
                      label={subItem}
                    />
                  ))}
                </Box>
              )}
              <Button
                onClick={() =>
                  handleRemove({ parent: item.parent, id: item.id })
                }
                variant="error"
              >
                Remove Task
              </Button>
            </CardContent>
          </Card>
        ))}
        <Chip
          size="small"
          color={task.status === "completed" ? "success" : "error"}
          label={task.status.toUpperCase()}
          sx={{ mr: 2 }}
        />
        <Chip color="error" size="small" label={task.deadline} />
        {task.assignee.length > 0 && (
          <Box>
            {task.assignee.map((item) => (
              <Chip
                sx={{ my: 2, mr: 1, "&:last-child": { mr: 0 } }}
                color="primary"
                size="small"
                label={item}
              />
            ))}
          </Box>
        )}

        <Button onClick={handleShow} variant="primary">
          Edit Task
        </Button>
        <Button
          onClick={() => handleRemove({ parent: task.parent, id: task.id })}
          variant="error"
        >
          Remove Task
        </Button>
      </Box>

      {showTaskForm && (
        <CreateTaskForm
          isEdit={true}
          task={task}
          open={showTaskForm}
          handleClose={closeHandler}
        />
      )}
    </CustomModal>
  );
};

export default TaskDetail;
