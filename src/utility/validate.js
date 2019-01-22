export const validate = ctx => {
  const newTodo = ctx.state.newTodo;
  return newTodo.length < 5 ? true : false;
};
