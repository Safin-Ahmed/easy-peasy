import { action, createStore } from "easy-peasy";

const store = createStore({
  projects: [],
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
    project.tasks[payload.task.id] = { ...payload.task };
  }),
  addUser: action((state, payload) => {
    state.users.push(payload);
  }),
});

export default store;
