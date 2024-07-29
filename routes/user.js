const express = require("express");
const router = express.Router();

const userController = require("../contollers/user");
const userAuthentication = require("../middlewares/auth");
router.get("/", userController.getSignUpPage);
router.post("/signUp", userController.postUserSignUp);
router.get("/login", userController.getLoginPage);
router.post("/login", userController.postUserLogin);
router.get("/allUsers", userAuthentication, userController.getAllUsers);
module.exports = router;
