const express = require("express");
const router = express.Router();
const orderController = require("../controllers/ordercontroller");

router.get("/", orderController.orderList);
router.get("/:id", orderController.orderDetails);
router.post("/", orderController.createOrder);

module.exports = router;
