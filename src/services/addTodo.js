import axios from "axios";

export const addTodoFunc = async ctx => {
  const response = await axios.post(`${ctx.apiUrl}/TododApp`, {
    name: ctx.state.newTodo
  });

  const todos = ctx.state.todos;
  todos.push(response.data);

  ctx.setState({
    todos,
    newTodo: ""
  });
  ctx.alert("added todo successfully");
};
