import { action, createStore } from "easy-peasy";

const store = createStore({
  projects: [],
  tasks: [],
  subTasks: [],
  users: [],
  addProject: action((state, payload) => {
    state.projects.push(payload);
  }),
  removeProject: action((state, payload) => {
    state.projects = state.projects.filter(
      (project) => project.id !== payload.id
    );
  }),

  addTask: action((state, payload) => {
    const project = state.projects.find(
      (project) => project.id === payload.projectId
    );
    if (project) {
      if (payload.parent === "0") {
        state.tasks.push(payload);
      } else {
        state.subTasks.push(payload);
      }
    } else {
      return;
    }
  }),

  updateTask: action((state, payload) => {
    let task;
    if (payload.parent === "0") {
      task = state.tasks.find((item) => item.id === payload.taskId);
    } else {
      task = state.subTasks.find((item) => item.id === payload.taskId);
    }

    task.status = payload.status;
  }),

  editTask: action((state, payload) => {
    let taskIndex;
    if (payload.parent === "0") {
      taskIndex = state.tasks.findIndex((item) => item.id === payload.id);
      state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...payload };
    } else {
      taskIndex = state.subTasks.findIndex((item) => item.id === payload.id);
      state.subTasks[taskIndex] = { ...state.tasks[taskIndex], ...payload };
    }

    // task = { projectId: task.projectId, ...payload };
  }),

  removeTask: action((state, payload) => {
    if (payload.parent === "0") {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
    } else {
      state.subTasks = state.subTasks.filter((task) => task.id !== payload.id);
    }

    state.subTasks = state.subTasks.filter(
      (task) => task.parent !== payload.id
    );
  }),

  addUser: action((state, payload) => {
    state.users.push(payload);
  }),
});

export default store;
