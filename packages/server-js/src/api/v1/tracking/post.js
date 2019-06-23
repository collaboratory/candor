const corsMiddleware = require("middleware/cors");
const esMiddleware = require("middleware/elastic");

module.exports = async router => {
  router.post("/api/v1/tracking", [
    esMiddleware,
    corsMiddleware,
    async ctx => {
      let events = [];
      const siteID = ctx.request.body.siteID || null;

      if (!siteID) {
        return ctx.throw(500, "Invalid SiteID provided");
      }

      if (Array.isArray(ctx.request.body.events)) {
        events = ctx.request.body.events;
      } else {
        try {
          events = JSON.parse(ctx.request.body.events);
        } catch (err) {
          console.error(
            "Failed to log invalid tracking body",
            ctx.request.body
          );
        }
      }

      // Do something with the events
      const documentID = uuid();
      await ctx.es.index({
        id: documentID,
        index: `tracking.${siteID}`,
        type: "session",
        body: {
          events
        }
      });

      ctx.response.body = { success: true, tracked: events.length, documentID };
    }
  ]);
};
