export const editTodoFunc = (ctx, index) => {
  const todo = ctx.state.todos[index];
  ctx.setState({
    editing: true,
    newTodo: todo.name,
    editingIndex: index
  });
  ctx.alert("you can now edit your todo");
};
