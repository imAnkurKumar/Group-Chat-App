const express = require("express");
const router = express.Router();
const chatController = require("../contollers/chat");
const userAutentication = require("../middlewares/auth");

router.post("/messages", userAutentication, chatController.sendMessage);
router.get("/messages", userAutentication, chatController.getMessages);

module.exports = router;
