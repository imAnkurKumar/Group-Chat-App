const Message = require("../models/message");
const User = require("../models/user");

const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const name = req.user.name;

    const message = await Message.create({
      name,
      content,
      userId,
    });

    res.status(201).json({ message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User, attributes: ["name"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
