import React from "react";

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => {
  return (
    <ul>
      {todos.map(({ id, text, completed }) => (
        <li key={id}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          ></input>
          <p>{text}</p>
          <button onClick={() => onDeleteTodo(id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
