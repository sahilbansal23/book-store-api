const express = require("express");
const router = express.Router();
const routesuser = require("../controllers/usercontroller");

router.post("/register", routesuser.register);
router.get("/login", routesuser.login);

module.exports = router;
