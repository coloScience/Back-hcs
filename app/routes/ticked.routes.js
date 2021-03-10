const controller = require("../controllers/ticked.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/ticked/create/", controller.tickedPost);
    app.get("/api/ticked/get/", controller.tickedGet);
};
