import { action, createStore } from "easy-peasy";

const store = createStore({
  todos: ["create store", "wrap application", "use store"],
  addTodo: action((state, payload) => {
    return {
      todos: [...state.todos, payload],
    };
  }),
});

export default store;
