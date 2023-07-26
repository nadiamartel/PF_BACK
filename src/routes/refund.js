const { Router } = require("express");
const refundRouter = Router();
const {postEmailRefund, postEmailRefundAdmin} = require ('../handlers/refundHandler');

refundRouter 
.post("/",postEmailRefund)
.post("/admin",postEmailRefundAdmin);

module.exports = refundRouter