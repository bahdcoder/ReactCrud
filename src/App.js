import axios from "axios";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListItem from "./ListItems";
import { alertFunc } from "./helpers/alert";
import { addTodoFunc } from "./services/addTodo";
import { updateTodoFunc } from "./services/updateTodo";
import { deleteTodoFunc } from "./services/deleteTodo";
import { editTodoFunc } from "./services/editTodo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: false,
      editingIndex: null,
      notification: null,
      todos: []
    };
    this.apiUrl = "https://5b68d401629e280014570d71.mockapi.io";
  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/TododApp`);
    this.setState({
      todos: response.data
    });
  }
  handleChange = event => {
    this.setState({
      newTodo: event.target.value
    });
  };

  addTodo = () => {
    addTodoFunc(this);
  };

  updateTodo = async () => {
    updateTodoFunc(this);
  };

  editTodo = index => {
    editTodoFunc(this, index);
  };

  alert = notification => {
    alertFunc(this, notification);
  };

  deleteTodo = async index => {
    deleteTodoFunc(this, index);
  };

  validate = () => {
    const newTodo = this.state.newTodo;
    return newTodo.length < 5 ? true : false;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">my new crud app</h1>
        </header>
        <div className="container">
          {this.state.notification && (
            <div className="alert alert-success mt-4">
              <p className="text-center">{this.state.notification}</p>
            </div>
          )}
          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            onChange={this.handleChange}
            placeholder="add new todo"
            value={this.state.newTodo}
          />
          <button
            className="btn btn-info my-3 form-control"
            type="button"
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.validate()}>
            {this.state.editing ? "update todo" : "add todo"}
          </button>
          {!this.state.editing && (
            <ul className="list-group">
              {this.state.todos.map((todo, index) => {
                return (
                  <ListItem
                    key={todo.id}
                    todo={todo}
                    editTodo={() => {
                      this.editTodo(index);
                    }}
                    deleteTodo={() => {
                      this.deleteTodo(index);
                    }}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
