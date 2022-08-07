import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import AddTodo from "./AddTodo";
import { useEffect } from "react";

const TodoList = () => {
  const todos = useStoreState((state) => state.todos);
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div>
      {todos.map((todo, index) => {
        return <div key={index}>{todo}</div>;
      })}

      <AddTodo />
    </div>
  );
};

export default TodoList;
