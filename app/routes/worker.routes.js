const controller = require("../controllers/worker.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/worker/", controller.workerGet)
  app.post("/api/workerSet/", controller.workerSet)
  app.post("/api/ticketToWorker/", controller.ticketToWorker)
};
