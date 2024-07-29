const Message = require("../models/message");
const User = require("../models/user");

const sendMessage = async (req, res, next) => {
  try {
    const user = req.user;
    const { content } = req.body;

    const newMessage = await Message.create({
      name: user.name,
      content: content,
      userId: user.id,
    });
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMessages, sendMessage };
