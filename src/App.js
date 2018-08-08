import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from "./ListItems"

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: []
    };
    this.apiUrl = "https://5b68d401629e280014570d71.mockapi.io";

    this.validate = this.validate.bind(this);
    this.alert = this.alert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

    async componentDidMount() {
      const response = await axios.get(`${this.apiUrl}/TododApp`);
      this.setState({
        todos: response.data
      });
    }
    handleChange(event) {
      this.setState({
        newTodo : event.target.value
      });
    }

    async addTodo() {
      const response = await axios.post(`${this.apiUrl}/TododApp`, {
        name: this.state.newTodo
      });

      const todos = this.state.todos;
      todos.push(response.data);

      this.setState({
        todos,
        newTodo: ''
      });
      this.alert("added todo successfully");
    }

    editTodo(index) {
      const todo = this.state.todos[index];
        this.setState({
          editing: true,
          newTodo: todo.name,
          editingIndex: index
        });
        this.alert("you can now edit your todo");
    }

    async updateTodo() {
      const todo = this.state.todos[this.state.editingIndex];

      const response = await axios.put(`${this.apiUrl}/TododApp/${todo.id}`, {
        name: this.state.newTodo
      });
      console.log(response);
      const todos = this.state.todos;
      todos[this.state.editingIndex] = response.data;
      this.setState({
        todos,
        editingIndex: null,
        newTodo: '',
        editing: false
      });
      this.alert("updated todo successfully");
    }

    alert(notification) {
      this.setState({
        notification
      });
      setTimeout(() => {
        this.setState({
          notification: null
        });
      },3000);
    }
    async deleteTodo(index) {
      const todos = this.state.todos;
      const todo = todos[index];
      await axios.delete(`${this.apiUrl}/TododApp/${todo.id}`);

      delete todos[index];
      this.setState({
        todos: todos
      });
      this.alert("deleted todo successfully");
    }

    validate() {
      const newTodo = this.state.newTodo;
      return newTodo.length < 5 ? true : false;
    }
    

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">my new crud app</h1>
        </header>
        <div className="container">
          {
            this.state.notification && 
            <div className = "alert alert-success mt-4">
              <p className = "text-center">{this.state.notification}</p>
            </div>
          }
          <input type="text" name="todo" className="my-4 form-control" onChange={this.handleChange} placeholder="add new todo" value={this.state.newTodo}/>
          <button className="btn btn-info my-3 form-control" type="button" onClick={this.state.editing ? this.updateTodo: this.addTodo} disabled={this.validate()}>
          {this.state.editing ? "update todo": "add todo"}
          </button>
            {!this.state.editing && 
            <ul className="list-group">
            {this.state.todos.map((todo, index) => {
              return <ListItem 
                        key={todo.id}
                        todo={todo}
                        editTodo={() => {this.editTodo(index);}}
                          deleteTodo={() => {this.deleteTodo(index);}}
                           />;
            })}
          </ul>}
        </div>
    </div>
    );
  }
}

export default App;
