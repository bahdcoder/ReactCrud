import axios from "axios";

export const updateTodoFunc = async ctx => {
  const todo = ctx.state.todos[ctx.state.editingIndex];

  const response = await axios.put(`${ctx.apiUrl}/TododApp/${todo.id}`, {
    name: ctx.state.newTodo
  });
  console.log(response);
  const todos = ctx.state.todos;
  todos[ctx.state.editingIndex] = response.data;
  ctx.setState({
    todos,
    editingIndex: null,
    newTodo: "",
    editing: false
  });
  ctx.alert("updated todo successfully");
};
