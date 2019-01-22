export const alertFunc = (ctx, notification) => {
  ctx.setState({
    notification
  });
  setTimeout(() => {
    return ctx.setState({
      notification: null
    });
  }, 3000);
};
