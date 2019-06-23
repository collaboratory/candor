module.exports = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,DELETE,PATCH");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Expose-Headers", true);
  await next();
};