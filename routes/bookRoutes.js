const express = require("express");
const router = express.Router();
const bookcontroller = require("../controllers/bookcontroller");

router.get("/", bookcontroller.getBooks);
router.get("/:id", bookcontroller.bookDetails);

module.exports = router;
