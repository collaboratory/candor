const knex = require("config/database");
const crypto = require("crypto");
const AUTH_ERROR_INVALID_INPUT = "Invalid e-mail address or password";

const sessionMiddleware = require("middleware/session");

module.exports = router => {
  router.post("/api/v1/auth/login", [sessionMiddleware, async ctx => {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      return ctx.throw(401, AUTH_ERROR_INVALID_INPUT);
    }

    const userData = await knex("users").where({ email }).first();
    if (!userData) {
      return ctx.throw(401, AUTH_ERROR_INVALID_INPUT);
    }

    if (userData.password_digest !== crypto.createHash("sha256").update(password).digest("base64")) {
      return ctx.throw(401, AUTH_ERROR_INVALID_INPUT);
    }

    // Remove the password_digest from the payload
    const { password_digest, ...user } = userData;

    ctx.session.user = user;
    ctx.response.body = { authenticated: true, user };
  }]);
};