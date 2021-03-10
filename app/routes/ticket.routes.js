const controller = require("../controllers/ticket.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/ticket/create/", controller.ticketPost);
    app.get("/api/ticket/get/", controller.ticketGet);
};
