import React, { Component } from "react";

import shortid from "shortid";
import Filter from "./components/Filter/Filter";

import TodoEditor from "./components/ToDoEditor/TodoEditor";
import TodoList from "./components/ToDoList/TodoList";
import initialTodos from "./todos.json";

class App extends Component {
  state = {
    todos: initialTodos,
    filter: "",
  };
  deleteTodos = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };
  toggleCompleted = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  addTodo = (text) => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleTodos = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.todos.filter((todo) =>
      todo.text.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <p>Всего заметок:{this.state.todos.length}</p>
        <p>
          Выполнено заметок:
          {this.state.todos.reduce(
            (total, todo) => (todo.completed ? total + 1 : total),
            0
          )}
        </p>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />
        <TodoEditor onSubmit={this.addTodo} />
        <TodoList
          todos={this.visibleTodos()}
          onDeleteTodo={this.deleteTodos}
          onToggleCompleted={this.toggleCompleted}
        />
      </>
    );
  }
}

export default App;
