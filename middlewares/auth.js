const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("token", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded : >>", decoded);
    const user = await User.findByPk(decoded.id);

    console.log("user", user);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });
  }
};
module.exports = authenticate;
