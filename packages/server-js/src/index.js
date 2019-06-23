const App = require("@emitterware/app");
const http = require("@emitterware/http");
const Router = require("@emitterware/router");
const glob = require("glob");


const app = new App();
app.subscribe(http({ port: 3000 }));

// Dynamic routes
const router = new Router();
glob(`${__dirname}/api/**/*.js`, (err, matches) => {
  if (err) {
    throw err;
  }
  matches.forEach(controller => require(controller)(router, app));
});
app.on("http", router.middleware);

// Default response
app.on("http", async ctx => {
  ctx.response.body = { version: "1.0" };
});