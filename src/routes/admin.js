const { Router } = require("express");
const adminRouter = Router();
const { getAllAdmin } = require("../handlers/adminHandler");

adminRouter
.get("/", getAllAdmin)

module.exports = adminRouter;