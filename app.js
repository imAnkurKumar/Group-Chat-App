const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const sequelize = require("./util/database");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const Message = require("./models/message");
const User = require("./models/user");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/user", chatRouter);

User.hasMany(Message);
Message.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
