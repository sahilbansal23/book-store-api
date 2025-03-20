const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartcontroller");

router.get("/", cartController.getCart);
router.post("/", cartController.addBook);
router.delete("/:itemId", cartController.deleteCartBook);


module.exports = router;
