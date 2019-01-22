import axios from "axios";

export const deleteTodoFunc = async (ctx, index) => {
  const todos = ctx.state.todos;
  const todo = todos[index];
  await axios.delete(`${ctx.apiUrl}/TododApp/${todo.id}`);

  delete todos[index];
  ctx.setState({
    todos: todos
  });
  ctx.alert("deleted todo successfully");
};
