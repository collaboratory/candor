const uuid = require("uuid/v4");
const moment = require("moment");
const options = {
  maxAge: 60 * 60 * 6,
  gcInterval: 3000
};

const sessionStore = {};

// Time out sessions older than maxAge every gcInterval
setInterval(() => {
  Object.keys(sessionStore).forEach(sessionID => {
    const sessionData = sessionStore[sessionID];
    if (moment(sessionData.seen) < moment().subtract(options.maxAge, "seconds")) {
      // This session has expired
      console.info(`Session - cleaning expired session (${sessionID})`);
      delete sessionStore[sessionID];
    }
  });
}, options.gcInterval);

module.exports = async (ctx, next) => {
  const sessionID =
    ctx.request.headers["X-SESSION-ID"] ||
    ctx.request.cookies["sessionID"] ||
    uuid();
  if (!sessionStore[sessionID]) {
    sessionStore[sessionID] = {};
  }

  ctx.response.headers['X-SESSION-ID'] = sessionID;
  ctx.response.cookies['X-SESSION-ID'] = sessionID;
  ctx.session = sessionStore[sessionID];
  await next();
};
