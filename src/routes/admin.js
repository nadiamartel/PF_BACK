const { Router } = require("express");
const adminRouter = Router();
const { getAllAdmin, updateAdmin } = require("../handlers/adminHandler");

adminRouter
.get("/", getAllAdmin)
.put("/:id", updateAdmin)

module.exports = adminRouter;