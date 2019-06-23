const sessionMiddleware = require("middleware/session");

module.exports = router => {
  router.get("/api/v1/auth/status", [sessionMiddleware, async ctx => {
    if (ctx.session.user) {
      ctx.response.body = {
        authenticated: true,
        user: ctx.session.user
      }
    } else {
      ctx.response.body = {
        authenticated: false
      };
    }
  }]);
};